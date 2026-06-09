module Api
  module V
    class CreatorUserSerializer < ApplicationSerializer
      attributes :nickname, :username, :introduction, :background_color,
                 :followers_count, :posts_count

      attribute :likes_count do
        object.post_likes_count
      end

      attribute :profile_image do
        object.profile_image.attached? ? url_for(object.profile_image) : nil
      end

      attribute :interaction_with_me do
        InteractionWithMeSerializer.new(object, scope: scope)
      end
    end
  end
end
