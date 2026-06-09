class Notification < ApplicationRecord
  belongs_to :user
  belongs_to :notifiable, polymorphic: true, optional: true

  enum :notification_type, {
    post_liked: 0,
    post_commented: 1,
    comment_liked: 2,
    comment_replied: 3,
    new_follower: 4,
    new_post: 5,
    post_tipped: 6
  }, prefix: true

  scope :unread, -> { where(read_at: nil) }
  scope :recent, -> { order(created_at: :desc) }

  def read!
    update!(read_at: Time.current) if read_at.nil?
  end
end
