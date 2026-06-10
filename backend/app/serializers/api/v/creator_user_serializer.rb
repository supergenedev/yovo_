module Api
  module V
    class CreatorUserSerializer < ApplicationSerializer
      attributes :nickname, :username, :introduction, :background_color,
                 :followers_count, :posts_count

      attribute :likes_count do
        object.post_likes_count
      end

      attribute :profile_image do
        # url_for는 host 설정이 필요한 절대 URL이라, /rails 프록시를 타는
        # 상대 경로로 통일한다 (PostSerializer media와 동일 방식)
        if object.profile_image.attached?
          Rails.application.routes.url_helpers.rails_blob_path(object.profile_image, only_path: true)
        end
      end

      attribute :tags do
        object.creator_tags.ordered.pluck(:name)
      end

      attribute :creator_type do
        object.creator_type
      end

      attribute :interaction_with_me do
        InteractionWithMeSerializer.new(object, scope: scope)
      end
    end
  end
end
