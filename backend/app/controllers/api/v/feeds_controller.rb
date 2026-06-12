module Api
  module V
    class FeedsController < ApplicationController
      def index
        posts = Post.feed_following(current_user).includes(:creator_user, media_attachments: :blob)
        render_with_pagy(collection: posts, serializer: PostSerializer, page: params[:page], limit: params[:items])
      end

      def discover
        posts = Post.feed_discover(current_user).includes(:creator_user, media_attachments: :blob)
        render_with_pagy(collection: posts, serializer: PostSerializer, page: params[:page], limit: params[:items])
      end

      # VIDEO 탭 전용: 팔로우 여부와 무관하게 영상 콘텐츠(video/episode)만
      def videos
        posts = Post.published
                    .where(content_type: %i[video episode])
                    .ordered
                    .includes(:creator_user, media_attachments: :blob)
        render_with_pagy(collection: posts, serializer: PostSerializer, page: params[:page], limit: params[:items])
      end

      # 트렌딩: 실제 포스트가 받은 (좋아요 + 댓글) 합산 순. 동률이면 먼저 올라온 순.
      def trending
        limit = (params[:limit].presence || 5).to_i.clamp(1, 50)
        posts = Post.published
                    .includes(:creator_user, media_attachments: :blob)
                    .order(Arel.sql("(posts.likes_count + posts.comments_count) DESC, posts.created_at ASC"))
                    .limit(limit)
        render json: posts, each_serializer: PostSerializer, scope: current_user, status: :ok
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
