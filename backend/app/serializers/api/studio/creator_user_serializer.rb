module Api
  module Studio
    class CreatorUserSerializer < ApplicationSerializer
      attributes :nickname, :username, :introduction, :background_color,
                 :followers_count, :posts_count, :status, :creator_type

      attribute :likes_count do
        object.post_likes_count
      end

      attribute :profile_image do
        object.profile_image.attached? ? url_for(object.profile_image) : nil
      end
    end
  end
end
