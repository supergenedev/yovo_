module Api
  module V
    class ChatRoomsController < ApplicationController
      before_action :set_chat_room, only: [:show, :seen]

      def index
        chat_rooms = current_user.chat_rooms.includes(:creator_user, :chats)
        render json: chat_rooms, each_serializer: ChatRoomSerializer, scope: current_user, status: :ok
      end

      def show
        render json: @chat_room, serializer: ChatRoomSerializer, scope: current_user
      end

      def create
        creator_user = CreatorUser.find(params[:creator_user_id])
        chat_room = ChatRoom.find_or_create_by!(user: current_user, creator_user:)
        render json: chat_room, serializer: ChatRoomSerializer, scope: current_user, status: :created
      end

      def seen
        last_chat = @chat_room.chats.order(created_at: :desc).first
        @chat_room.update!(user_last_seen_chat_id: last_chat&.id&.to_s)
        default_success_render
      end

      private

      def set_chat_room
        @chat_room = current_user.chat_rooms.find(params[:id])
      end
    end
  end
end
