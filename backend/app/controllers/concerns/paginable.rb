module Paginable
  extend ActiveSupport::Concern

  included do
    include Pagy::Backend
  end

  def render_with_pagy(collection:, serializer:, page: nil, limit: nil)
    pagy, records = pagy(collection, page: page || 1, items: limit || 20)
    render json: {
      data: ActiveModelSerializers::SerializableResource.new(records, each_serializer: serializer, scope: current_user).as_json,
      meta: pagy_metadata(pagy)
    }
  end
end
