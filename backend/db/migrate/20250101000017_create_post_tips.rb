class CreatePostTips < ActiveRecord::Migration[8.1]
  def change
    create_table :post_tips do |t|
      t.references :post, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.integer :amount, null: false, default: 0
      t.timestamps
    end
  end
end
