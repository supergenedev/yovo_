module Api
  module V
    class PostCommentsController < ApplicationController
      before_action :set_post, only: [:index, :create]
      before_action :set_comment, only: [:update, :destroy]

      def index
        comments = @post.post_comments.where(parent_id: nil).order(created_at: :asc)
        render json: comments, each_serializer: PostCommentSerializer, scope: current_user, status: :ok
      end

      def create
        comment = @post.post_comments.create!(
          commenter: current_user,
          text: params[:text],
          parent_id: params[:parent_id],
          mention_id: params[:mention_id],
          mention_nickname: params[:mention_nickname]
        )
        render json: comment, serializer: PostCommentSerializer, scope: current_user, status: :created
      end

      def update
        @comment.update!(text: params[:text])
        render json: @comment, serializer: PostCommentSerializer, scope: current_user
      end

      def destroy
        @comment.destroy!
        default_success_render
      end

      private

      def set_post
        @post = Post.find(params[:post_id])
      end

      def set_comment
        @comment = PostComment.find(params[:id])
        raise ActionController::BadRequest, "Not authorized" unless @comment.commenter == current_user
      end
    end
  end
end
