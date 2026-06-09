module Api
  module V
    class ApplicationController < ActionController::API
      before_action :authenticate_user!
      include ErrorHandler
      include Paginable

      def default_success_render(message: "ok")
        render status: :ok, json: default_render_json(message:)
      end

      def default_render_json(message: "ok")
        { code: 200, type: "success", message:, title: nil }
      end
    end
  end
end
