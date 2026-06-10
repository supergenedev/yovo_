module Api
  module V
    class PostTipsController < ApplicationController
      before_action :set_post

      def create
        raise ActionController::BadRequest, "Cannot tip your own post" if @post.creator_user.user_id == current_user.id

        amount = tip_params[:amount].to_i
        raise ActionController::BadRequest, "Invalid amount" unless amount > 0

        user_coin = UserCoin.find_by!(user: current_user)
        post_tip = nil
        ApplicationRecord.transaction do
          user_coin.lock!
          # 코인 차감 없이 팁이 무한정 가능하던 버그 수정
          raise ActionController::BadRequest, "Insufficient coins" if user_coin.coin < amount

          prev_coin = user_coin.coin
          user_coin.update!(coin: prev_coin - amount)
          post_tip = PostTip.create!(post: @post, user: current_user, amount:)
          @post.increment!(:tip_amount, amount)
          UserCoinHistory.create!(
            user:         current_user,
            user_coin:    user_coin,
            target:       @post,
            creator_user: @post.creator_user,
            history_type: "tip",
            amount:       -amount,
            prev_coin:    prev_coin,
            current_coin: user_coin.coin,
          )
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
