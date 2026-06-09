module Api
  module V
    class PostsController < ApplicationController
      before_action :set_post, only: [:show]

      def show
        render json: @post, serializer: PostSerializer, scope: current_user
      end

      private

      def set_post
        @post = Post.find(params[:id])
      end
    end
  end
end
