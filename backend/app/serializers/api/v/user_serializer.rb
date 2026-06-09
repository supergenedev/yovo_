module Api
  module V
    class UserSerializer < ApplicationSerializer
      attributes :nickname, :username, :introduction, :followings_count

      attribute :access_token, if: :access_token_present?

      attribute :profile_image do
        object.profile_image.attached? ? url_for(object.profile_image) : nil
      end

      attribute :banner_image do
        object.banner_image.attached? ? url_for(object.banner_image) : nil
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
