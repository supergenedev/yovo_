module Api
  module Studio
    class ChatRoomSerializer < ApplicationSerializer
      attributes :creator_memo

      attribute :unread_count do
        object.creator_unread_count
      end

      attribute :last_message do
        object.last_message&.message || ""
      end

      attribute :last_messaged_at do
        (object.last_message&.created_at.to_f * 1000).to_i if object.last_message
      end

      attribute :user do
        { id: object.user.id.to_s, nickname: object.user.nickname, username: object.user.username }
      end
    end
  end
end
