class AllowlistedJwt < ApplicationRecord
  belongs_to :user

  def jwt_valid?
    exp > Time.current
  end

  def self.find_by_jwt_token(token)
    raw = token.to_s.remove("Bearer ")
    jwt_payload = JWT.decode(raw, Rails.application.credentials.secret_key_base).first
    find_by(jti: jwt_payload["jti"])
  rescue JWT::DecodeError
    nil
  end
end
