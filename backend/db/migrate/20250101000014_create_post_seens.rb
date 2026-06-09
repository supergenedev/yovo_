class CreatePostSeens < ActiveRecord::Migration[8.1]
  def change
    create_table :post_seens do |t|
      t.references :post
      t.references :user
      t.integer :referer, null: false, default: 0
      t.timestamps
    end
    add_index :post_seens, [:user_id, :post_id], unique: true
  end
end
