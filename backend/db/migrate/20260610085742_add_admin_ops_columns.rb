class AddAdminOpsColumns < ActiveRecord::Migration[8.1]
  def change
    # 신고 처리 상태 (NULL = 미처리)
    add_column :issues, :resolved_at, :datetime
    add_index :issues, :resolved_at

    # 유저 정지 (하드 삭제 대신 되돌릴 수 있는 조치)
    add_column :users, :suspended_at, :datetime
  end
end
