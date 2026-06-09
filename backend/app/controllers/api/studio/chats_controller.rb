module Api
  module Studio
    class ChatsController < ApplicationController
      before_action :set_chat_room

      def index
        chats = @chat_room.chats.order(created_at: :asc)
        render json: chats, each_serializer: ChatSerializer, status: :ok
      end

      def create
        chat = @chat_room.chats.create!(
          sender: current_creator_user,
          sender_type: "CreatorUser",
          message: params[:message],
          content_type: params[:content_type] || "text",
          content_price: params[:content_price] || 0,
          message_type: "dm"
        )
        render json: chat, serializer: ChatSerializer, status: :created
      end

      private

      def set_chat_room
        @chat_room = current_creator_user.chat_rooms.find(params[:chat_room_id])
      end
    end
  end
end
