module Api
  module V
    class PostCommentSerializer < ApplicationSerializer
      attributes :text, :likes_count, :replies_count, :mention_nickname

      attribute :commenter do
        c = object.commenter
        next { type: object.commenter_type, id: object.commenter_id.to_s } unless c

        profile_img = c.profile_image.attached? ? url_for(c.profile_image) : nil rescue nil
        {
          type:          object.commenter_type,
          id:            c.id.to_s,
          nickname:      c.try(:nickname),
          username:      c.try(:username),
          profile_image: profile_img,
        }
      end

      attribute :parent_id do
        object.parent_id&.to_s
      end
    end
  end
end
