class PostCommentLike < ApplicationRecord
  belongs_to :post_comment, counter_cache: :likes_count
  belongs_to :liker, polymorphic: true
end
