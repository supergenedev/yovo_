module Api
  module V
    class PostTipSerializer < ApplicationSerializer
      attributes :amount

      attribute :post_id do
        object.post_id.to_s
      end

      attribute :user do
        {
          nickname: object.user.nickname,
          username: object.user.username,
          profile_image: object.user.profile_image.attached? ? Rails.application.routes.url_helpers.rails_blob_path(object.user.profile_image, only_path: true) : nil
        }
      end
    end
  end
end
