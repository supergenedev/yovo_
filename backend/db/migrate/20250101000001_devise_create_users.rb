class DeviseCreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users do |t|
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""
      t.string :reset_password_token
      t.datetime :reset_password_sent_at
      t.datetime :remember_created_at
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.string   :current_sign_in_ip
      t.string   :last_sign_in_ip
      t.string   :jti, null: false
      t.string   :service_id
      t.string   :service_type
      t.json     :service_providers
      t.string   :nickname, null: false
      t.string   :username
      t.text     :introduction, null: false, default: ""
      t.datetime :deleted_at
      t.integer  :followings_count, null: false, default: 0
      t.timestamps null: false
    end
    add_index :users, :email
    add_index :users, :reset_password_token, unique: true
    add_index :users, :jti, unique: true
    add_index :users, :deleted_at
  end
end
