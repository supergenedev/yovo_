class CreateIssues < ActiveRecord::Migration[8.1]
  def change
    create_table :issues do |t|
      t.references :user, null: false, foreign_key: true
      t.string :issuable_type, null: false
      t.bigint :issuable_id, null: false
      t.integer :issue_reason, null: false, default: 0
      t.integer :issue_type, null: false, default: 0
      t.text :description
      t.timestamps
    end
    add_index :issues, [:issuable_type, :issuable_id]
    add_index :issues, [:user_id, :issuable_type, :issuable_id], unique: true
  end
end
