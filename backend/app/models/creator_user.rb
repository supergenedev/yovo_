class CreatorUser < ApplicationRecord
  include ProfilePolicyCompliable
  acts_as_paranoid

  belongs_to :user
  has_many :chat_rooms, dependent: :destroy
  has_many :follows, dependent: :destroy
  has_many :followers, through: :follows, source: :user
  has_many :posts, dependent: :destroy
  has_many :post_comment_likes, as: :liker, dependent: :destroy
  has_many :coin_histories, class_name: "UserCoinHistory", foreign_key: "creator_user_id"
  has_one_attached :profile_image

  attribute :introduction, :string, default: ""
  validates :nickname, presence: true
  validates :introduction, presence: { allow_blank: true }, length: { maximum: 1000 }

  enum :creator_type, { basic: 0, official: 1 }, prefix: :creator_type
  enum :status, { pending: 0, active: 1, inactive: 2 }, prefix: :status

  scope :active_creators, -> { where(status: :active) }

  def self.search_and_order(query)
    return none if query.blank?
    sanitized = ActiveRecord::Base.sanitize_sql_like(query)
    where(
      "username LIKE :q OR nickname LIKE :q OR introduction LIKE :q",
      q: "%#{sanitized}%"
    ).order(
      Arel.sql("CASE WHEN nickname LIKE '%#{sanitized}%' THEN 0 ELSE 1 END"),
      Arel.sql("CASE WHEN username LIKE '%#{sanitized}%' THEN 0 ELSE 1 END"),
      created_at: :desc
    )
  end
end
