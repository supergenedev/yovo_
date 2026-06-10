module Api
  module Users
    class RegistrationsController < ActionController::API
      def create
        user = User.new(sign_up_params)

        unless user.save
          return render json: {
            code: 422, type: "error",
            message: user.errors.full_messages.join(", ")
          }, status: :unprocessable_entity
        end

        token, payload = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil)
        user.on_jwt_dispatch(token, payload)
        render json: user, serializer: Api::V::UserSerializer, status: :created, access_token: token
      end

      private

      def sign_up_params
        params.require(:user).permit(:email, :password, :nickname).merge(
          password_confirmation: params.dig(:user, :password)
        )
      end
    end
  end
end
