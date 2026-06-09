module Api
  module V
    class FollowsController < ApplicationController
      def create
        creator_user = CreatorUser.find(params[:creator_user_id])
        follow = current_user.follows.find_or_create_by!(creator_user:)
        render json: { id: follow.id.to_s }, status: :created
      end

      def destroy
        follow = current_user.follows.find_by!(creator_user_id: params[:id])
        follow.destroy!
        default_success_render
      end

      def following
        creators = current_user.following_creator_users
        render json: creators, each_serializer: CreatorUserSerializer, scope: current_user, status: :ok
      end

      def recommend
        followed_ids = current_user.following_creator_users.pluck(:id)
        creators = CreatorUser.where(status: :active).where.not(id: followed_ids + [current_user.creator_user&.id].compact)
        render json: creators, each_serializer: CreatorUserSerializer, scope: current_user, status: :ok
      end
    end
  end
end
