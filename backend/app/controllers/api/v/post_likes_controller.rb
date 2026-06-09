module Api
  module V
    class PostLikesController < ApplicationController
      before_action :set_post

      def create
        @post.post_likes.find_or_create_by!(user: current_user)
        default_success_render
      end

      def destroy
        like = @post.post_likes.find_by!(user: current_user)
        like.destroy!
        default_success_render
      end

      private

      def set_post
        @post = Post.find(params[:post_id])
      end
    end
  end
end
