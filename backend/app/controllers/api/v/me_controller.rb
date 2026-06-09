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
          post_ids = UserCoinHistory.where(user: current_user, target_type: "Post").pluck(:target_id)
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

      private

      def update_params
        params.permit(:username, :nickname, :introduction, :profile_image, :banner_image)
              .reject { |_, v| v.blank? }
      end
    end
  end
end
