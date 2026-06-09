module Api
  module Studio
    class ApplicationSerializer < ActiveModel::Serializer
      attribute :id do
        object.id.to_s
      end

      attribute :created_at do
        (object.created_at.to_f * 1000).to_i if object.created_at.present?
      end
    end
  end
end
