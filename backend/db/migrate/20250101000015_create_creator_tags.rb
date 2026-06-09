class CreateCreatorTags < ActiveRecord::Migration[8.1]
  def change
    create_table :creator_tags do |t|
      t.references :creator_user, null: false, foreign_key: true
      t.string :name, null: false

      t.timestamps
    end

    add_index :creator_tags, [:creator_user_id, :name], unique: true
  end
end
