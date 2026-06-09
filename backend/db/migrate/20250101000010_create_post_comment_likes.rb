class CreatePostCommentLikes < ActiveRecord::Migration[8.1]
  def change
    create_table :post_comment_likes do |t|
      t.references :post_comment
      t.string :liker_type
      t.bigint :liker_id
      t.timestamps
    end
    add_index :post_comment_likes, [:liker_type, :liker_id]
  end
end
