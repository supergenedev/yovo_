module Api
  module V
    class BookmarksController < ApplicationController
      before_action :set_post

      def create
        current_user.bookmarks.find_or_create_by!(post: @post)
        default_success_render
      end

      def destroy
        bookmark = current_user.bookmarks.find_by!(post: @post)
        bookmark.destroy!
        default_success_render
      end

      private

      def set_post
        @post = Post.find(params[:post_id])
      end
    end
  end
end
