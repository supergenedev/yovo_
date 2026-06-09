module Api
  module V
    class InteractionWithMeSerializer < ActiveModel::Serializer
      attribute :is_following do
        return false unless scope
        Follow.exists?(user_id: scope.id, creator_user_id: object.id)
      end

      attribute :is_my_account do
        return false unless scope
        scope.creator_user&.id == object.id
      end
    end
  end
end
