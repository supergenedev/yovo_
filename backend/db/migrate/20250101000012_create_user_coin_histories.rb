class CreateUserCoinHistories < ActiveRecord::Migration[8.1]
  def change
    create_table :user_coin_histories do |t|
      t.references :user, null: false
      t.references :user_coin, null: false
      t.string :target_type, null: false
      t.bigint :target_id, null: false
      t.string :history_type, null: false
      t.bigint :prev_coin, null: false, default: 0
      t.bigint :amount, null: false, default: 0
      t.bigint :current_coin, null: false, default: 0
      t.references :creator_user
      t.timestamps
    end
    add_index :user_coin_histories, [:target_type, :target_id]
  end
end
