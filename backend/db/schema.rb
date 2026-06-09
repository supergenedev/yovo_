# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2025_01_01_000014) do
  create_table "allowlisted_jwts", force: :cascade do |t|
    t.string "aud"
    t.datetime "created_at", null: false
    t.datetime "exp", null: false
    t.string "jti", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["jti"], name: "index_allowlisted_jwts_on_jti", unique: true
    t.index ["user_id"], name: "index_allowlisted_jwts_on_user_id"
  end

  create_table "bookmarks", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "post_id", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["post_id"], name: "index_bookmarks_on_post_id"
    t.index ["user_id"], name: "index_bookmarks_on_user_id"
  end

  create_table "chat_rooms", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "creator_last_seen_chat_id"
    t.string "creator_memo"
    t.integer "creator_user_id", null: false
    t.datetime "deleted_at"
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.string "user_last_seen_chat_id"
    t.index ["creator_user_id"], name: "index_chat_rooms_on_creator_user_id"
    t.index ["deleted_at"], name: "index_chat_rooms_on_deleted_at"
    t.index ["user_id", "creator_user_id"], name: "index_chat_rooms_on_user_id_and_creator_user_id", unique: true
    t.index ["user_id"], name: "index_chat_rooms_on_user_id"
  end

  create_table "chats", force: :cascade do |t|
    t.integer "chat_room_id", null: false
    t.integer "content_price", default: 0
    t.string "content_type", default: "text"
    t.datetime "created_at", null: false
    t.text "message"
    t.string "message_type", default: "dm"
    t.bigint "sender_id"
    t.string "sender_type"
    t.datetime "updated_at", null: false
    t.index ["chat_room_id"], name: "index_chats_on_chat_room_id"
    t.index ["sender_type", "sender_id"], name: "index_chats_on_sender_type_and_sender_id"
  end

  create_table "creator_users", force: :cascade do |t|
    t.string "background_color", default: "#ffffff"
    t.datetime "created_at", null: false
    t.integer "creator_type", default: 0, null: false
    t.datetime "deleted_at"
    t.integer "followers_count", default: 0, null: false
    t.text "introduction", default: "", null: false
    t.integer "likes_count", default: 0, null: false
    t.string "nickname", null: false
    t.integer "post_likes_count", default: 0
    t.integer "posts_count", default: 0, null: false
    t.integer "received_coin", default: 0
    t.integer "status", default: 0
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.string "username"
    t.index ["deleted_at"], name: "index_creator_users_on_deleted_at"
    t.index ["user_id"], name: "index_creator_users_on_user_id"
  end

  create_table "follows", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "creator_user_id"
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.index ["creator_user_id"], name: "index_follows_on_creator_user_id"
    t.index ["user_id", "creator_user_id"], name: "index_follows_on_user_and_creator_user_unique", unique: true
    t.index ["user_id"], name: "index_follows_on_user_id"
  end

  create_table "post_comment_likes", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "liker_id"
    t.string "liker_type"
    t.integer "post_comment_id"
    t.datetime "updated_at", null: false
    t.index ["liker_type", "liker_id"], name: "index_post_comment_likes_on_liker_type_and_liker_id"
    t.index ["post_comment_id"], name: "index_post_comment_likes_on_post_comment_id"
  end

  create_table "post_comments", force: :cascade do |t|
    t.bigint "commenter_id", null: false
    t.string "commenter_type", null: false
    t.datetime "created_at", null: false
    t.integer "likes_count", default: 0
    t.bigint "mention_id"
    t.string "mention_nickname"
    t.integer "parent_id"
    t.integer "post_id", null: false
    t.integer "replies_count", default: 0
    t.text "text"
    t.datetime "updated_at", null: false
    t.index ["commenter_type", "commenter_id"], name: "index_post_comments_on_commenter_type_and_commenter_id"
    t.index ["parent_id"], name: "index_post_comments_on_parent_id"
    t.index ["post_id"], name: "index_post_comments_on_post_id"
  end

  create_table "post_likes", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "post_id"
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.index ["post_id"], name: "index_post_likes_on_post_id"
    t.index ["user_id"], name: "index_post_likes_on_user_id"
  end

  create_table "post_seens", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "post_id"
    t.integer "referer", default: 0, null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.index ["post_id"], name: "index_post_seens_on_post_id"
    t.index ["user_id", "post_id"], name: "index_post_seens_on_user_id_and_post_id", unique: true
    t.index ["user_id"], name: "index_post_seens_on_user_id"
  end

  create_table "posts", force: :cascade do |t|
    t.text "body_ja"
    t.text "body_ko"
    t.integer "comments_count", default: 0, null: false
    t.integer "content_price", default: 0, null: false
    t.integer "content_type", default: 0, null: false
    t.datetime "created_at", null: false
    t.integer "creator_user_id"
    t.integer "likes_count", default: 0, null: false
    t.string "locked_thumbnail_url"
    t.datetime "pinned_at"
    t.datetime "scheduled_at"
    t.integer "status", default: 0, null: false
    t.integer "tip_amount", default: 0, null: false
    t.string "title_ja"
    t.string "title_ko"
    t.datetime "updated_at", null: false
    t.integer "view_type", default: 0, null: false
    t.index ["creator_user_id"], name: "index_posts_on_creator_user_id"
  end

  create_table "user_coin_histories", force: :cascade do |t|
    t.bigint "amount", default: 0, null: false
    t.datetime "created_at", null: false
    t.integer "creator_user_id"
    t.bigint "current_coin", default: 0, null: false
    t.string "history_type", null: false
    t.bigint "prev_coin", default: 0, null: false
    t.bigint "target_id", null: false
    t.string "target_type", null: false
    t.datetime "updated_at", null: false
    t.integer "user_coin_id", null: false
    t.integer "user_id", null: false
    t.index ["creator_user_id"], name: "index_user_coin_histories_on_creator_user_id"
    t.index ["target_type", "target_id"], name: "index_user_coin_histories_on_target_type_and_target_id"
    t.index ["user_coin_id"], name: "index_user_coin_histories_on_user_coin_id"
    t.index ["user_id"], name: "index_user_coin_histories_on_user_id"
  end

  create_table "user_coins", force: :cascade do |t|
    t.bigint "coin", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["user_id"], name: "index_user_coins_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "current_sign_in_at"
    t.string "current_sign_in_ip"
    t.datetime "deleted_at"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.integer "followings_count", default: 0, null: false
    t.text "introduction", default: "", null: false
    t.string "jti", null: false
    t.datetime "last_sign_in_at"
    t.string "last_sign_in_ip"
    t.string "nickname", null: false
    t.datetime "remember_created_at"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.string "service_id"
    t.json "service_providers"
    t.string "service_type"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "updated_at", null: false
    t.string "username"
    t.index ["deleted_at"], name: "index_users_on_deleted_at"
    t.index ["email"], name: "index_users_on_email"
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "allowlisted_jwts", "users", on_delete: :cascade
  add_foreign_key "bookmarks", "posts"
  add_foreign_key "bookmarks", "users"
  add_foreign_key "creator_users", "users"
  add_foreign_key "post_comments", "post_comments", column: "mention_id", on_delete: :nullify
  add_foreign_key "post_comments", "post_comments", column: "parent_id"
  add_foreign_key "user_coins", "users"
end
