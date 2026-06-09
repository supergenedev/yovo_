class CreateChats < ActiveRecord::Migration[8.1]
  def change
    create_table :chats do |t|
      t.references :chat_room, null: false
      t.string  :sender_type
      t.bigint  :sender_id
      t.text    :message
      t.string  :content_type, default: "text"
      t.integer :content_price, default: 0
      t.string  :message_type, default: "dm"
      t.timestamps
    end
    add_index :chats, [:sender_type, :sender_id]
  end
end
