module Api
  module V
    class CreatorUsersController < ApplicationController
      before_action :set_creator_user, only: [:show, :posts]

      def show
        render json: @creator_user, serializer: CreatorUserSerializer
      end

      def recommend
        followed_ids = current_user.following_creator_users.pluck(:id)
        excluded_ids = (followed_ids + [current_user.creator_user&.id]).compact.uniq
        creators = CreatorUser.where.not(id: excluded_ids).where(status: :active)
        render json: creators, each_serializer: CreatorUserSerializer, scope: current_user, status: :ok
      end

      def discover
        followed_ids = current_user.following_creator_users.pluck(:id)
        excluded_ids = (followed_ids + [current_user.creator_user&.id]).compact.uniq
        creators = CreatorUser.where(status: :active).where.not(id: excluded_ids).order("RANDOM()")
        render json: creators, each_serializer: CreatorUserSerializer, scope: current_user, status: :ok
      end

      def posts
        posts = @creator_user.posts.published.ordered
        posts = posts.where(view_type: :buyer_only) if params[:filter] == "store"
        posts = posts.where.not(content_type: :text) if params[:filter] == "media"
        render_with_pagy(collection: posts, serializer: PostSerializer, page: params[:page], limit: params[:items])
      end

      def search
        creators = CreatorUser.search_and_order(params[:query].to_s.strip)
        render json: creators, each_serializer: CreatorUserSerializer, scope: current_user, status: :ok
      end

      private

      def set_creator_user
        @creator_user = CreatorUser.find(params[:id])
      end
    end
  end
end
