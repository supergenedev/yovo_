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

      # 내 크리에이터 신청/활성 상태 (없으면 null) — 프로필 화면의 신청 버튼 분기용
      attribute :creator_user do
        next nil unless object.creator_user
        {
          id:     object.creator_user.id.to_s,
          status: object.creator_user.status,
        }
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
