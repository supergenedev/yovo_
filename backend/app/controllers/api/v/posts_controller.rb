module Api
  module V
    class PostsController < ApplicationController
      before_action :set_post, only: %i[show purchase]

      def show
        render json: @post, serializer: PostSerializer, scope: current_user
      end

      def purchase
        raise ActionController::BadRequest, "Post is not buyer_only" unless @post.view_type_buyer_only?

        user_coin = UserCoin.find_by!(user: current_user)
        ApplicationRecord.transaction do
          user_coin.lock!

          # 멱등성: 이미 구매한 포스트는 재차감 없이 성공 응답
          unless UserCoinHistory.exists?(user: current_user, target: @post, history_type: "purchase")
            raise ActionController::BadRequest, "Insufficient coins" if user_coin.coin < @post.content_price

            prev_coin = user_coin.coin
            user_coin.update!(coin: prev_coin - @post.content_price)
            UserCoinHistory.create!(
              user:         current_user,
              user_coin:    user_coin,
              target:       @post,
              creator_user: @post.creator_user,
              history_type: "purchase",
              amount:       -@post.content_price,
              prev_coin:    prev_coin,
              current_coin: user_coin.coin,
            )
          end

          PostSeen.find_or_create_by!(user: current_user, post_id: @post.id) do |seen|
            seen.referer = :purchase
          end
        end

        render json: @post, serializer: PostSerializer, scope: current_user
      end

      # 피드 노출 시점에 일괄 seen 처리. 미디어 잠금 해제와는 무관하다
      # (잠금은 UserCoinHistory 구매 기록 기준).
      def batch_seen
        ids = Post.published.where(id: Array(params[:post_ids]).first(100)).pluck(:id)
        ids.each do |post_id|
          PostSeen.find_or_create_by!(user: current_user, post_id: post_id) do |seen|
            seen.referer = :feed
          end
        end
        default_success_render
      end

      def batch_get
        posts = Post.published.where(id: Array(params[:post_ids]).first(100))
                    .includes(:creator_user, media_attachments: :blob)
        render json: posts, each_serializer: PostSerializer, scope: current_user, root: "data", adapter: :json
      end

      private

      def set_post
        @post = Post.find(params[:id])
      end
    end
  end
end
