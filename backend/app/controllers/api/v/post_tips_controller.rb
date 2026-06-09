module Api
  module V
    class PostTipsController < ApplicationController
      before_action :set_post

      def create
        raise ActionController::BadRequest, "Cannot tip your own post" if @post.creator_user.user_id == current_user.id

        amount = tip_params[:amount].to_i
        raise ActionController::BadRequest, "Invalid amount" unless amount > 0

        post_tip = nil
        ApplicationRecord.transaction do
          post_tip = PostTip.create!(post: @post, user: current_user, amount:)
          @post.increment!(:tip_amount, amount)
        end
        render json: post_tip, serializer: PostTipSerializer
      end

      private

      def set_post
        @post = Post.find(params[:post_id])
      end

      def tip_params
        params.permit(:amount)
      end
    end
  end
end
