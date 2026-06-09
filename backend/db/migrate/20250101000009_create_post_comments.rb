class CreatePostComments < ActiveRecord::Migration[8.1]
  def change
    create_table :post_comments do |t|
      t.references :post, null: false
      t.string  :commenter_type, null: false
      t.bigint  :commenter_id, null: false
      t.text    :text
      t.integer :replies_count, default: 0
      t.references :parent, foreign_key: { to_table: :post_comments }
      t.bigint  :mention_id
      t.integer :likes_count, default: 0
      t.string  :mention_nickname
      t.timestamps
    end
    add_index :post_comments, [:commenter_type, :commenter_id]
    add_foreign_key :post_comments, :post_comments, column: :mention_id, on_delete: :nullify
  end
end
