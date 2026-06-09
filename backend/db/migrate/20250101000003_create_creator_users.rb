class CreateCreatorUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :creator_users do |t|
      t.references :user, foreign_key: true
      t.string  :nickname, null: false
      t.string  :username
      t.text    :introduction, null: false, default: ""
      t.string  :background_color, default: "#ffffff"
      t.integer :received_coin, default: 0
      t.datetime :deleted_at
      t.integer :creator_type, null: false, default: 0
      t.integer :followers_count, null: false, default: 0
      t.integer :posts_count, null: false, default: 0
      t.integer :likes_count, null: false, default: 0
      t.integer :post_likes_count, default: 0
      t.integer :status, default: 0
      t.timestamps
    end
    add_index :creator_users, :deleted_at
  end
end
