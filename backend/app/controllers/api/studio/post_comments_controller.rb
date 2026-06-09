module Api
  module Studio
    class PostCommentsController < ApplicationController
      before_action :set_post, only: [:index, :create]

      def index
        comments = @post.post_comments.where(parent_id: nil).order(created_at: :asc)
        render json: comments, each_serializer: PostCommentSerializer, status: :ok
      end

      def create
        comment = @post.post_comments.create!(
          commenter: current_creator_user,
          text: params[:text],
          parent_id: params[:parent_id],
          mention_id: params[:mention_id],
          mention_nickname: params[:mention_nickname]
        )
        render json: comment, serializer: PostCommentSerializer, status: :created
      end

      private

      def set_post
        @post = current_creator_user.posts.find(params[:post_id])
      end
    end
  end
end
