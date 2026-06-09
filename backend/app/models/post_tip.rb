class PostTip < ApplicationRecord
  belongs_to :post
  belongs_to :user

  validates :amount, presence: true, numericality: { greater_than: 0 }
end
