module Api
  module Studio
    class ApplicationController < ActionController::API
      before_action :authenticate_user!
      before_action :set_current_creator_user
      before_action :authenticate_creator!
      include ErrorHandler
      include Paginable

      def current_creator_user
        @current_creator_user
      end

      def default_success_render(message: "ok")
        render status: :ok, json: default_render_json(message:)
      end

      def default_render_json(message: "ok")
        { code: 200, type: "success", message:, title: nil }
      end

      private

      def set_current_creator_user
        @current_creator_user = current_user&.creator_user
      end

      def authenticate_creator!
        unless current_creator_user&.status_active?
          render json: { error: "Creator pending approval" }, status: :forbidden
        end
      end
    end
  end
end
