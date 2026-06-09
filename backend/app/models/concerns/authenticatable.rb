module Authenticatable
  extend ActiveSupport::Concern

  included do
    include Devise::JWT::RevocationStrategies::Allowlist

    devise :database_authenticatable, :registerable, :rememberable,
           :jwt_authenticatable, jwt_revocation_strategy: self

    def self.jwt_revoked?(payload, user)
      token = user.allowlisted_jwts.find_by(payload.slice("jti", "aud"))
      raise JWT::ExpiredSignature if token.blank? || !token.jwt_valid?
      token.update(exp: Time.current + 15.days) if token.present? && token.updated_at < 1.day.ago
      token.blank?
    end

    def on_jwt_dispatch(_token, payload)
      allowlisted_jwts.create!(
        jti: payload["jti"],
        aud: payload["aud"],
        exp: 15.days.from_now
      )
    end
  end
end
