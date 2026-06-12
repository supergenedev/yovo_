module Api
  module V
    class MeController < ApplicationController
      def show
        render json: current_user, serializer: UserSerializer
      end

      def update
        current_user.update!(update_params)
        render json: current_user, serializer: UserSerializer
      end

      def destroy
        current_user.destroy!
        default_success_render
      end

      def posts
        if params[:filter] == "saved"
          posts = current_user.bookmarked_posts
        elsif params[:filter] == "purchased"
          # 팁(history_type: tip)도 target이 Post라서 history_type으로 구매만 거른다
          post_ids = UserCoinHistory.where(user: current_user, target_type: "Post", history_type: "purchase").pluck(:target_id)
          posts = Post.where(id: post_ids)
        else
          raise ActionController::BadRequest, "Invalid filter"
        end
        render_with_pagy(collection: posts, serializer: PostSerializer, page: params[:page], limit: params[:items])
      end

      def apply_creator
        creator_user = current_user.apply_as_creator!
        render json: creator_user, serializer: CreatorUserSerializer, scope: current_user
      rescue ArgumentError => e
        raise ActionController::BadRequest, e.message
      end

      def confirm_username
        username = params[:username]
        if !User.exists?(username:)
          default_success_render
        else
          render json: { code: 299, type: "success", message: "Unavailable UserId", title: nil }
        end
      end

      def coin
        render json: current_user.user_coin, serializer: UserCoinSerializer
      end

      # 즉시 충전 (mock 결제 — 결제 연동 전까지 바로 충전 처리)
      def charge
        amount = params[:amount].to_i
        raise ActionController::BadRequest, "Invalid amount" unless amount > 0
        raise ActionController::BadRequest, "Invalid amount" if amount > 1_000_000

        user_coin = UserCoin.find_or_create_by!(user: current_user)
        ApplicationRecord.transaction do
          user_coin.lock!
          prev_coin = user_coin.coin
          user_coin.update!(coin: prev_coin + amount)
          UserCoinHistory.create!(
            user:         current_user,
            user_coin:    user_coin,
            target:       current_user, # 충전은 대상 포스트가 없어 유저 자신을 target으로 둔다
            history_type: "charge",
            amount:       amount,
            prev_coin:    prev_coin,
            current_coin: user_coin.coin,
          )
        end
        render json: user_coin, serializer: UserCoinSerializer
      end

      def coin_histories
        histories = UserCoinHistory.where(user: current_user)
                                   .includes(:creator_user)
                                   .order(created_at: :desc)
        render_with_pagy(collection: histories, serializer: UserCoinHistorySerializer, page: params[:page], limit: params[:items])
      end

      private

      def update_params
        params.permit(:username, :nickname, :introduction, :profile_image, :banner_image)
              .reject { |_, v| v.blank? }
      end
    end
  end
end
