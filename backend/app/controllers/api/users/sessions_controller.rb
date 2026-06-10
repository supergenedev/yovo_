module Api
  module Users
    class SessionsController < ActionController::API
      def create
        user = User.find_for_database_authentication(email: params.dig(:user, :email))

        unless user&.valid_password?(params.dig(:user, :password))
          return render json: {
            code: 401, type: "unauthorized",
            message: "이메일 또는 비밀번호가 올바르지 않습니다.", title: nil
          }, status: :unauthorized
        end

        # 수동 인증이라 devise의 active 체크를 직접 호출해야 한다 (정지 계정 차단)
        unless user.active_for_authentication?
          return render json: {
            code: 401, type: "unauthorized",
            message: "정지된 계정입니다. 고객센터에 문의하세요.", title: nil
          }, status: :unauthorized
        end

        token, payload = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil)
        user.on_jwt_dispatch(token, payload)
        render json: user, serializer: Api::V::UserSerializer, status: :ok, access_token: token
      end

      def destroy
        raw_token = request.env['HTTP_AUTHORIZATION']&.delete_prefix('Bearer ')&.strip
        if raw_token.present?
          begin
            secret = Warden::JWTAuth.config.secret
            payload = JWT.decode(raw_token, secret, true, algorithms: ['HS256']).first
            User.find_by(id: payload['sub'])
                &.allowlisted_jwts
                &.find_by(jti: payload['jti'])
                &.destroy
          rescue StandardError
            # invalid/expired token — no-op
          end
        end
        render json: { code: 200, type: "success", message: "logged out successfully", title: nil }, status: :ok
      end
    end
  end
end
