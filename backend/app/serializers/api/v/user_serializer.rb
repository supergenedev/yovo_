module Api
  module V
    class UserSerializer < ApplicationSerializer
      attributes :nickname, :username, :introduction, :followings_count

      attribute :access_token, if: :access_token_present?

      attribute :profile_image do
        if object.profile_image.attached?
          Rails.application.routes.url_helpers.rails_blob_path(object.profile_image, only_path: true)
        end
      end

      attribute :banner_image do
        if object.banner_image.attached?
          Rails.application.routes.url_helpers.rails_blob_path(object.banner_image, only_path: true)
        end
      end

      def access_token_present?
        instance_options[:access_token].present?
      end

      def access_token
        instance_options[:access_token]
      end
    end
  end
end
