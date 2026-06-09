module ProfilePolicyCompliable
  extend ActiveSupport::Concern

  included do
    validates :nickname, length: { maximum: 30 }, allow_blank: true
    validates :username, length: { maximum: 30 }, format: { with: /\A[a-zA-Z0-9_]+\z/, message: "only allows letters, numbers and underscores" }, allow_blank: true
  end
end
