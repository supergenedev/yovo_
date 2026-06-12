module Api
  module Studio
    class PostSerializer < ApplicationSerializer
      attributes :title_ko, :title_ja, :body_ko, :body_ja,
                 :view_type, :status, :comments_count, :likes_count,
                 :content_type, :content_price, :tip_amount,
                 :locked_thumbnail_url, :pinned_at, :scheduled_at

      # 크리에이터 본인 콘텐츠이므로 잠금 없이 첨부 미디어를 모두 노출한다.
      attribute :media do
        object.media.map do |attachment|
          {
            url: Rails.application.routes.url_helpers.rails_blob_path(attachment, only_path: true),
            content_type: attachment.content_type,
            filename: attachment.filename.to_s,
          }
        end
      end
    end
  end
end
