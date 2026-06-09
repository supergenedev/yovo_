module Api
  module Studio
    class MeController < ApplicationController
      def show
        render json: current_creator_user, serializer: CreatorUserSerializer
      end

      def update
        current_creator_user.update!(update_params)
        render json: current_creator_user, serializer: CreatorUserSerializer
      end

      def confirm_username
        username = params[:username]
        if !CreatorUser.exists?(username:)
          default_success_render
        else
          render json: { code: 299, type: "success", message: "Unavailable username", title: nil }
        end
      end

      private

      def update_params
        params.permit(:nickname, :username, :introduction, :background_color, :profile_image)
              .reject { |_, v| v.blank? }
      end
    end
  end
end
