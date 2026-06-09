module Api
  module V
    class PostSerializer < ApplicationSerializer
      attributes :title_ko, :title_ja, :body_ko, :body_ja,
                 :view_type, :status, :comments_count, :likes_count,
                 :content_type, :content_price, :tip_amount,
                 :locked_thumbnail_url, :pinned_at, :scheduled_at

      attribute :is_pinned do
        object.pinned_at.present?
      end

      attribute :creator_user do
        CreatorUserSerializer.new(object.creator_user, scope: scope).as_json
      end

      attribute :interaction_with_me do
        PostInteractionWithMeSerializer.new(object, scope: scope).as_json if scope
      end
    end
  end
end
