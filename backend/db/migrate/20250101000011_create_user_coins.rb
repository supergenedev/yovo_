class CreateUserCoins < ActiveRecord::Migration[8.1]
  def change
    create_table :user_coins do |t|
      t.references :user, null: false, foreign_key: true
      t.bigint :coin, null: false, default: 0
      t.timestamps
    end
  end
end
