module Api
  module Studio
    class PostsController < ApplicationController
      before_action :set_post, only: [:show, :update, :destroy, :thumbnail]

      def index
        posts = current_creator_user.posts.ordered
        render_with_pagy(collection: posts, serializer: PostSerializer, page: params[:page], limit: params[:items])
      end

      def show
        render json: @post, serializer: PostSerializer
      end

      def create
        post = current_creator_user.posts.create!(post_params)
        render json: post, serializer: PostSerializer, scope: current_user, status: :created
      end

      def update
        @post.update!(post_params)
        render json: @post, serializer: PostSerializer
      end

      def destroy
        @post.destroy!
        default_success_render
      end

      # 기존 미디어(영상)를 교체하지 않고 썸네일 이미지를 추가로 첨부한다.
      # (update의 media= 는 컬렉션을 통째로 교체하므로 백필에는 attach를 쓴다)
      def thumbnail
        @post.media.attach(params[:thumbnail])
        render json: @post, serializer: PostSerializer, scope: current_user
      end

      private

      def set_post
        @post = current_creator_user.posts.find(params[:id])
      end

      def post_params
        params.permit(:title_ko, :title_ja, :body_ko, :body_ja,
                      :view_type, :status, :content_type, :content_price,
                      :locked_thumbnail_url, :tip_amount, :scheduled_at,
                      media: [])
      end
    end
  end
end
