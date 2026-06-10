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

      # 첨부 미디어. buyer_only 포스트는 구매(PostSeen) 전까지 빈 배열로 잠근다.
      attribute :media do
        next [] unless media_visible?
        object.media.map do |attachment|
          {
            url: Rails.application.routes.url_helpers.rails_blob_path(attachment, only_path: true),
            content_type: attachment.content_type,
            filename: attachment.filename.to_s,
          }
        end
      end

      attribute :creator_user do
        CreatorUserSerializer.new(object.creator_user, scope: scope).as_json
      end

      attribute :interaction_with_me do
        next nil unless scope
        {
          liked:     PostLike.exists?(user_id: scope.id, post_id: object.id),
          bookmarked: Bookmark.exists?(user_id: scope.id, post_id: object.id),
          seen:      PostSeen.exists?(user_id: scope.id, post_id: object.id),
          purchased: purchased?,
        }
      end

      private

      # 잠금 해제 기준은 구매 기록(UserCoinHistory)이다.
      # PostSeen은 batch_seen 등으로 무료 생성될 수 있으므로 기준으로 쓰면 우회된다.
      def purchased?
        return false unless scope
        UserCoinHistory.exists?(
          user_id: scope.id, target_type: "Post", target_id: object.id, history_type: "purchase",
        )
      end

      def media_visible?
        return true unless object.view_type_buyer_only?
        return false unless scope
        return true if object.creator_user.user_id == scope.id
        purchased?
      end
    end
  end
end
