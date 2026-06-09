module Api
  module V
    class NotificationSerializer < ApplicationSerializer
      attributes :notification_type, :title, :body

      attribute :read do
        object.read_at.present?
      end

      attribute :read_at do
        (object.read_at.to_f * 1000).to_i if object.read_at.present?
      end

      attribute :notifiable do
        return nil unless object.notifiable.present?
        case object.notifiable
        when Post
          { id: object.notifiable.id.to_s, type: "post", title: object.notifiable.title_ko }
        when PostComment
          { id: object.notifiable.id.to_s, type: "post_comment" }
        when CreatorUser
          { id: object.notifiable.id.to_s, type: "creator_user", nickname: object.notifiable.nickname }
        else
          nil
        end
      end
    end
  end
end
