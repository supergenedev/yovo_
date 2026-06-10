class Issue < ApplicationRecord
  VALID_ISSUABLE_TYPES = %w[Post CreatorUser].freeze

  enum :issue_reason, { not_like: 0, sexual: 1, aversive: 2, self_hurt: 3, etc: 999 }
  enum :issue_type, { report: 0, block: 1 }

  belongs_to :user
  belongs_to :issuable, polymorphic: true

  validates :issue_reason, :issue_type, presence: true
  validates :issuable_type, inclusion: { in: VALID_ISSUABLE_TYPES }
  validates :user_id, uniqueness: { scope: [:issuable_type, :issuable_id] }

  scope :unresolved, -> { where(resolved_at: nil) }
  scope :resolved, -> { where.not(resolved_at: nil) }

  def resolved?
    resolved_at.present?
  end

  def resolve!
    update!(resolved_at: Time.current)
  end
end
