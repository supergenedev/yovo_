module Api
  module V
    class FeedsController < ApplicationController
      def index
        posts = Post.feed_following(current_user)
        render_with_pagy(collection: posts, serializer: PostSerializer, page: params[:page], limit: params[:items])
      end

      def discover
        posts = Post.feed_discover(current_user)
        render_with_pagy(collection: posts, serializer: PostSerializer, page: params[:page], limit: params[:items])
      end

      def creators
        following_ids = current_user.following_creator_users.select(:id)
        excluded_ids = (following_ids.map(&:id) + [ current_user.creator_user&.id ]).compact.uniq
        creators = CreatorUser.where.not(id: excluded_ids)
                              .where(status: :active)
                              .order(post_likes_count: :desc)
                              .limit(10)
        render json: creators, each_serializer: CreatorUserSerializer, scope: current_user, status: :ok
      end
    end
  end
end
