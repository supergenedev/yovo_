module Api
  module Studio
    class CreatorUserSerializer < ApplicationSerializer
      attributes :nickname, :username, :introduction, :background_color,
                 :followers_count, :posts_count, :status, :creator_type

      attribute :likes_count do
        object.post_likes_count
      end

      attribute :profile_image do
        if object.profile_image.attached?
          Rails.application.routes.url_helpers.rails_blob_path(object.profile_image, only_path: true)
        end
      end
    end
  end
end
