class Follow < ApplicationRecord
  belongs_to :user, counter_cache: :followings_count
  belongs_to :creator_user, counter_cache: :followers_count

  after_create :create_chat_room

  private

  def create_chat_room
    return if creator_user.user == user
    ChatRoom.find_or_create_by!(user:, creator_user:)
  end
end
