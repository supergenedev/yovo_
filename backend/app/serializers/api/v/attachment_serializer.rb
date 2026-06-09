module Api
  module V
    class AttachmentSerializer < ActiveModel::Serializer
      attribute :url do
        rails_blob_url(object) if object.attached?
      rescue
        nil
      end

      attribute :content_type do
        object.content_type if object.attached?
      end
    end
  end
end
