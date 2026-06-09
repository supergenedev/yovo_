class CreatorTag < ApplicationRecord
  belongs_to :creator_user

  validates :name, presence: true, length: { maximum: 30 }
  validates :name, uniqueness: { scope: :creator_user_id }

  scope :ordered, -> { order(created_at: :asc) }
end
