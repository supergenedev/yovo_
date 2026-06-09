class CreateFollows < ActiveRecord::Migration[8.1]
  def change
    create_table :follows do |t|
      t.references :user
      t.references :creator_user
      t.timestamps
    end
    add_index :follows, [:user_id, :creator_user_id], unique: true, name: "index_follows_on_user_and_creator_user_unique"
  end
end
