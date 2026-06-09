module Api
  module Studio
    class ChatRoomsController < ApplicationController
      before_action :set_chat_room, only: [:show, :seen]

      def index
        chat_rooms = current_creator_user.chat_rooms.includes(:user, :chats)
        render json: chat_rooms, each_serializer: ChatRoomSerializer, status: :ok
      end

      def show
        render json: @chat_room, serializer: ChatRoomSerializer
      end

      def seen
        last_chat = @chat_room.chats.order(created_at: :desc).first
        @chat_room.update!(creator_last_seen_chat_id: last_chat&.id&.to_s)
        default_success_render
      end

      private

      def set_chat_room
        @chat_room = current_creator_user.chat_rooms.find(params[:id])
      end
    end
  end
end
