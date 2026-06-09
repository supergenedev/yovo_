module Api
  module Studio
    class PostCommentSerializer < ApplicationSerializer
      attributes :text, :likes_count, :replies_count, :mention_nickname

      attribute :commenter do
        { type: object.commenter_type, id: object.commenter_id.to_s }
      end
    end
  end
end
