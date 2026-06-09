class ChatRoom < ApplicationRecord
  acts_as_paranoid

  belongs_to :user
  belongs_to :creator_user
  has_many :chats, dependent: :destroy

  def creator_unread_count
    return 0 unless creator_last_seen_chat_id.present?
    chats.where("id > ?", creator_last_seen_chat_id.to_i).count
  rescue
    chats.count
  end

  def user_unread_count
    return chats.count unless user_last_seen_chat_id.present?
    chats.where("id > ?", user_last_seen_chat_id.to_i).count
  rescue
    chats.count
  end

  def last_message
    chats.order(created_at: :desc).first
  end
end
