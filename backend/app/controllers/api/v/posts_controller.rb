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
        raise ActionController::BadRequest, "Insufficient coins" if user_coin.coin < @post.content_price

        user_coin.update!(coin: user_coin.coin - @post.content_price)
        PostSeen.find_or_create_by!(user: current_user, post_id: @post.id, referer: :feed)

        render json: @post, serializer: PostSerializer, scope: current_user
      end

      private

      def set_post
        @post = Post.find(params[:id])
      end
    end
  end
end
