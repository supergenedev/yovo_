class CreateChatRooms < ActiveRecord::Migration[8.1]
  def change
    create_table :chat_rooms do |t|
      t.references :user, null: false
      t.references :creator_user, null: false
      t.string  :user_last_seen_chat_id
      t.string  :creator_last_seen_chat_id
      t.string  :creator_memo
      t.datetime :deleted_at
      t.timestamps
    end
    add_index :chat_rooms, [:user_id, :creator_user_id], unique: true
    add_index :chat_rooms, :deleted_at
  end
end
