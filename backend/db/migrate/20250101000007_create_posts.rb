class CreatePosts < ActiveRecord::Migration[8.1]
  def change
    create_table :posts do |t|
      t.references :creator_user
      t.integer :view_type, null: false, default: 0
      t.integer :status, null: false, default: 0
      t.integer :comments_count, null: false, default: 0
      t.integer :likes_count, null: false, default: 0
      t.string  :title_ko
      t.string  :title_ja
      t.text    :body_ko
      t.text    :body_ja
      t.integer :content_type, null: false, default: 0
      t.integer :content_price, null: false, default: 0
      t.string  :locked_thumbnail_url
      t.datetime :pinned_at
      t.integer :tip_amount, null: false, default: 0
      t.datetime :scheduled_at
      t.timestamps
    end
  end
end
