module Api
  module Studio
    class CreatorTagsController < ApplicationController
      before_action :require_creator!

      def index
        render json: { tags: current_creator_user.creator_tags.ordered.pluck(:name) }
      end

      def create
        tag = current_creator_user.creator_tags.build(name: params[:name])
        tag.save!
        render json: { tags: current_creator_user.creator_tags.ordered.pluck(:name) }, status: :created
      end

      def destroy
        tag = current_creator_user.creator_tags.find_by!(name: params[:id])
        tag.destroy!
        render json: { tags: current_creator_user.creator_tags.ordered.pluck(:name) }
      end

      private

      def current_creator_user
        @current_creator_user ||= current_user.creator_user
      end

      def require_creator!
        render json: { code: 403, type: "forbidden", message: "Creator account required", title: nil }, status: :forbidden unless current_creator_user
      end
    end
  end
end
