module Api
  module V
    class EnumsController < ApplicationController
      def index
        render json: {
          post: {
            content_type: Post.content_types,
            view_type: Post.view_types,
            status: Post.statuses
          },
          creator_user: {
            creator_type: CreatorUser.creator_types,
            status: CreatorUser.statuses
          },
          notification: {
            notification_type: Notification.notification_types
          }
        }
      end
    end
  end
end
