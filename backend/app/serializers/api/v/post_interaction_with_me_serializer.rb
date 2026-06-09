module Api
  module V
    class PostInteractionWithMeSerializer < ActiveModel::Serializer
      attribute :liked do
        return false unless scope
        PostLike.exists?(user_id: scope.id, post_id: object.id)
      end

      attribute :bookmarked do
        return false unless scope
        Bookmark.exists?(user_id: scope.id, post_id: object.id)
      end

      attribute :seen do
        return false unless scope
        PostSeen.exists?(user_id: scope.id, post_id: object.id)
      end
    end
  end
end
