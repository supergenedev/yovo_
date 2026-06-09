class User < ApplicationRecord
  include Authenticatable
  include ProfilePolicyCompliable
  acts_as_paranoid

  has_one :creator_user, dependent: :destroy
  has_one :user_coin
  has_many :chat_rooms, dependent: :destroy
  has_many :follows, dependent: :destroy
  has_many :following_creator_users, through: :follows, source: :creator_user
  has_many :post_seens, dependent: :destroy
  has_many :post_likes, dependent: :destroy
  has_many :bookmarks, dependent: :destroy
  has_many :bookmarked_posts, through: :bookmarks, source: :post
  has_many :post_comments, as: :commenter, dependent: :destroy
  has_many :post_comment_likes, as: :liker, dependent: :destroy
  has_many :notifications, dependent: :destroy
  has_one_attached :profile_image
  has_one_attached :banner_image

  attribute :introduction, :string, default: ""
  validates :nickname, presence: true
  validates :introduction, presence: { allow_blank: true }, length: { maximum: 1000 }

  after_create :create_user_coin

  def apply_as_creator!
    raise ArgumentError, "Already a creator" if creator_user.present?

    CreatorUser.create!(user: self, nickname:, status: :pending)
  end

  private

  def create_user_coin
    UserCoin.create(user: self, coin: 0) unless user_coin
  end
end
