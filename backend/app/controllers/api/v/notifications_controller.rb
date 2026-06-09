module Api
  module V
    class NotificationsController < ApplicationController
      def index
        notifications = current_user.notifications.recent
        render_with_pagy(collection: notifications, serializer: NotificationSerializer, page: params[:page], limit: params[:items])
      end

      def unread_count
        count = current_user.notifications.unread.count
        render json: { count: }
      end

      def read_all
        current_user.notifications.unread.update_all(read_at: Time.current)
        render json: { code: 200, type: "success", message: "ok", title: nil }
      end

      def update
        notification = current_user.notifications.find(params[:id])
        notification.read!
        render json: notification, serializer: NotificationSerializer
      end
    end
  end
end
