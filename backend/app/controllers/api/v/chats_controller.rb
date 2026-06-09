module Api
  module V
    class ChatsController < ApplicationController
      before_action :set_chat_room

      def index
        chats = @chat_room.chats.order(created_at: :asc)
        serialized = ActiveModelSerializers::SerializableResource.new(chats, each_serializer: ChatSerializer).as_json
        data = serialized.is_a?(Hash) ? serialized.values.first : serialized
        render json: { data: data }, status: :ok
      end

      def create
        chat = @chat_room.chats.create!(
          sender: current_user,
          sender_type: "User",
          message: params[:message],
          content_type: params[:content_type] || "text",
          content_price: params[:content_price] || 0,
          message_type: "dm"
        )
        serialized = ActiveModelSerializers::SerializableResource.new(chat, serializer: ChatSerializer).as_json
        data = serialized.is_a?(Hash) ? serialized.values.first : serialized
        render json: { data: data }, status: :created
      end

      private

      def set_chat_room
        @chat_room = current_user.chat_rooms.find(params[:chat_room_id])
      end
    end
  end
end
