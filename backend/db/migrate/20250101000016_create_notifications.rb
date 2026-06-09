class CreateNotifications < ActiveRecord::Migration[8.1]
  def change
    create_table :notifications do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :notification_type, null: false, default: 0
      t.string :title
      t.text :body
      t.datetime :read_at
      t.string :notifiable_type
      t.bigint :notifiable_id

      t.timestamps
    end

    add_index :notifications, [:notifiable_type, :notifiable_id]
    add_index :notifications, [:user_id, :read_at]
  end
end
