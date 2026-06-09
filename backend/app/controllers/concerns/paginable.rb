module Paginable
  extend ActiveSupport::Concern

  included do
    include Pagy::Backend
  end

  def render_with_pagy(collection:, serializer:, page: nil, limit: nil)
    pagy, records = pagy(collection, page: page || 1, items: limit || 20)
    serialized = ActiveModelSerializers::SerializableResource.new(records, each_serializer: serializer, scope: current_user).as_json
    data = serialized.is_a?(Hash) ? serialized.values.first : serialized
    render json: { data: data || [], meta: pagy_metadata(pagy) }
  end
end
