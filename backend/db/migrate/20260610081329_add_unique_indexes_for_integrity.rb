class AddUniqueIndexesForIntegrity < ActiveRecord::Migration[8.1]
  def change
    # 동시 요청 시 중복 좋아요/북마크 생성 + counter_cache 오염 방지
    add_index :post_likes, [ :user_id, :post_id ], unique: true,
              name: "index_post_likes_on_user_id_and_post_id"
    add_index :bookmarks, [ :user_id, :post_id ], unique: true,
              name: "index_bookmarks_on_user_id_and_post_id"

    # devise 앱 레벨 검증만으로는 동시 가입 레이스를 못 막는다
    remove_index :users, :email, name: "index_users_on_email"
    add_index :users, :email, unique: true, name: "index_users_on_email"
  end
end
