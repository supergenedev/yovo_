module Api
  module V
    class PostCommentLikesController < ApplicationController
      before_action :set_post_comment

      def create
        PostCommentLike.find_or_create_by!(liker: current_user, post_comment: @post_comment)
        @post_comment.reload
        render json: @post_comment, serializer: Api::V::PostCommentSerializer, scope: current_user
      end

      def destroy
        PostCommentLike.find_by!(liker: current_user, post_comment: @post_comment).destroy!
        @post_comment.reload
        render json: @post_comment, serializer: Api::V::PostCommentSerializer, scope: current_user
      end

      private

      def set_post_comment
        @post_comment = PostComment.find(params[:post_comment_id])
      end
    end
  end
end
