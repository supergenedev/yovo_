class PostComment < ApplicationRecord
  belongs_to :post, counter_cache: :comments_count
  belongs_to :commenter, polymorphic: true
  belongs_to :parent, class_name: "PostComment", optional: true
  belongs_to :mention, class_name: "PostComment", optional: true
  has_many :replies, class_name: "PostComment", foreign_key: :parent_id, dependent: :destroy
  has_many :post_comment_likes, dependent: :destroy
end
