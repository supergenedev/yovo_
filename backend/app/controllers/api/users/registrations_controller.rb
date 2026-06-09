module Api
  module Users
    class RegistrationsController < Devise::RegistrationsController
      skip_before_action :verify_authenticity_token

      def create
        super do |resource|
          unless resource.persisted?
            return render json: {
              code: 422, type: "error",
              message: resource.errors.full_messages.join(", ")
            }, status: :unprocessable_entity
          end
        end
      end

      def respond_with(_current_user, _opts = {})
        if resource.persisted?
          access_token = "Bearer #{request.env['warden-jwt_auth.token']}"
          render json: resource, serializer: Api::V::UserSerializer, status: :created, access_token: access_token
        else
          render json: {
            code: 422, message: resource.errors.full_messages.join(", "),
            type: "error", title: nil
          }, status: :unprocessable_entity
        end
      end

      protected

      def sign_up_params
        params.permit(:email, :password, :nickname).merge(
          password_confirmation: params[:password]
        )
      end
    end
  end
end
