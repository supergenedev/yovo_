module Api
  module Users
    class SessionsController < Devise::SessionsController
      skip_before_action :verify_authenticity_token
      respond_to :json

      def create
        user = User.find_for_database_authentication(email: params[:email])

        unless user&.valid_password?(params[:password])
          return render json: {
            code: 401, type: "unauthorized",
            message: "이메일 또는 비밀번호가 올바르지 않습니다.", title: nil
          }, status: :unauthorized
        end

        sign_in(:user, user)
        access_token = "Bearer #{request.env['warden-jwt_auth.token']}"
        render json: user, serializer: Api::V::UserSerializer, status: :ok, access_token: access_token
      end

      private

      def respond_to_on_destroy
        if current_user
          render json: { code: 200, type: "success", message: "logged out successfully", title: nil }, status: :ok
        else
          render json: { code: 401, type: "unauthorized", message: "Unauthorized", title: nil }, status: :unauthorized
        end
      end
    end
  end
end
