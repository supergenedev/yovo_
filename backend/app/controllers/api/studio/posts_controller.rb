module Api
  module Studio
    class PostsController < ApplicationController
      before_action :set_post, only: [:show, :update, :destroy]

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
