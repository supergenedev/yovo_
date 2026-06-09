class Post < ApplicationRecord
  belongs_to :creator_user, counter_cache: :posts_count
  has_many :post_likes, dependent: :destroy
  has_many :post_comments, dependent: :destroy
  has_many :post_seens, dependent: :destroy
  has_many :bookmarks, dependent: :destroy

  enum :view_type, { everyone: 0, subscriber_only: 1, buyer_only: 2 }
  enum :status, { draft: 0, published: 1, scheduled: 2 }
  enum :content_type, { text: 0, image: 1, video: 2, episode: 3 }, prefix: :content

  scope :published, -> { where(status: :published) }
  scope :ordered, -> { order(pinned_at: :desc, created_at: :desc) }
end
