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
  # jti는 NOT NULL — 회원가입 시 자동 채움 (없으면 가입이 500으로 터진다)
  before_validation :ensure_jti, on: :create
  validates :nickname, presence: true
  validates :introduction, presence: { allow_blank: true }, length: { maximum: 1000 }

  after_create :create_user_coin

  def apply_as_creator!
    raise ArgumentError, "Already a creator" if creator_user.present?

    CreatorUser.create!(user: self, nickname:, status: :pending)
  end

  # ── 정지 (어드민) ─────────────────────────────────────────
  def suspended?
    suspended_at.present?
  end

  def suspend!
    transaction do
      update!(suspended_at: Time.current)
      # 기발급 JWT 즉시 무효화 (revocation 전략이 Allowlist이므로 목록 삭제가 정답)
      allowlisted_jwts.destroy_all
    end
  end

  def unsuspend!
    update!(suspended_at: nil)
  end

  # devise: 정지된 유저는 로그인 거부
  def active_for_authentication?
    super && !suspended?
  end

  def inactive_message
    suspended? ? :suspended : super
  end

  private

  def ensure_jti
    self.jti ||= SecureRandom.uuid
  end

  def create_user_coin
    UserCoin.create(user: self, coin: 0) unless user_coin
  end
end
