class Chat < ApplicationRecord
  belongs_to :chat_room
  belongs_to :sender, polymorphic: true, optional: true
end
