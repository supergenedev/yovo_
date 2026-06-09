module Api
  module Studio
    class ChatSerializer < ApplicationSerializer
      attributes :message, :content_type, :content_price, :message_type

      attribute :chat_room_id do
        object.chat_room_id.to_s
      end

      attribute :sender_type do
        object.sender_type
      end
    end
  end
end
