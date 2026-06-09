module Api
  module V
    class ChatRoomSerializer < ApplicationSerializer
      attribute :unread_count do
        object.user_unread_count
      end

      attribute :last_message do
        object.last_message&.message || ""
      end

      attribute :last_messaged_at do
        (object.last_message&.created_at.to_f * 1000).to_i if object.last_message
      end

      attribute :creator_user do
        CreatorUserSerializer.new(object.creator_user, scope: scope).as_json
      end
    end
  end
end
