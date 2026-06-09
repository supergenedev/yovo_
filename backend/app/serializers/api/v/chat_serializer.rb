module Api
  module V
    class ChatSerializer < ApplicationSerializer
      attributes :message, :content_type, :content_price, :message_type, :sender_type

      attribute :id do
        object.id.to_s
      end

      attribute :chat_room_id do
        object.chat_room_id.to_s
      end

      attribute :sender_id do
        object.sender_id.to_s
      end

      attribute :created_at do
        (object.created_at.to_f * 1000).to_i
      end
    end
  end
end
