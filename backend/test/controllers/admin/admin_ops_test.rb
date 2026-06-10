require "test_helper"

# 어드민 운영 기능 통합 테스트:
# 크리에이터 승인/거절, 신고 처리, 댓글 삭제, 코인 지급/차감, 유저 정지, 검색
class Admin::AdminOpsTest < ActionDispatch::IntegrationTest
  setup do
    post admin_login_path, params: { email: admin_users(:one).email, password: "password123" }
  end

  # ── 크리에이터 승인/거절 ─────────────────────────────────

  test "approves pending creator" do
    creator = creator_users(:bob_creator)
    assert creator.status_pending?

    patch approve_admin_creator_path(creator)
    assert_redirected_to admin_creators_path
    assert creator.reload.status_active?
  end

  test "rejects pending creator" do
    creator = creator_users(:bob_creator)
    patch reject_admin_creator_path(creator)
    assert creator.reload.status_inactive?
  end

  test "creators index filters by status" do
    get admin_creators_path(status: "pending")
    assert_response :success
    assert_match "BobCreator", response.body
    assert_no_match "AliceCreator", response.body
  end

  # ── 신고 관리 ────────────────────────────────────────────

  test "lists unresolved issues" do
    get admin_issues_path
    assert_response :success
    assert_match "미처리", response.body
  end

  test "resolves issue" do
    issue = issues(:report_on_post)
    assert_not issue.resolved?

    patch resolve_admin_issue_path(issue)
    assert issue.reload.resolved?
  end

  test "resolved filter hides unresolved" do
    get admin_issues_path(filter: "resolved")
    assert_response :success
  end

  # ── 댓글 관리 ────────────────────────────────────────────

  test "lists and destroys comment" do
    comment = posts(:published_post).post_comments.create!(commenter: users(:bob), text: "부적절한 댓글")

    get admin_post_comments_path
    assert_response :success
    assert_match "부적절한 댓글", response.body

    assert_difference "PostComment.count", -1 do
      delete admin_post_comment_path(comment)
    end
  end

  test "searches comments by text" do
    posts(:published_post).post_comments.create!(commenter: users(:bob), text: "찾아야할댓글")
    posts(:published_post).post_comments.create!(commenter: users(:bob), text: "다른내용")

    get admin_post_comments_path(q: "찾아야할")
    assert_match "찾아야할댓글", response.body
    assert_no_match "다른내용", response.body
  end

  # ── 코인 관리 ────────────────────────────────────────────

  test "grants coins to user with history" do
    user = users(:bob)
    user_coins(:bob_coin).update!(coin: 10)

    post admin_coins_path, params: { user_id: user.id, amount: 500 }
    assert_equal 510, user_coins(:bob_coin).reload.coin
    history = UserCoinHistory.where(user: user, history_type: "admin_grant").last
    assert_equal 500, history.amount
    assert_equal 10, history.prev_coin
    assert_equal 510, history.current_coin
  end

  test "deducts coins but never below zero" do
    user_coins(:bob_coin).update!(coin: 100)

    post admin_coins_path, params: { user_id: users(:bob).id, amount: -30 }
    assert_equal 70, user_coins(:bob_coin).reload.coin

    post admin_coins_path, params: { user_id: users(:bob).id, amount: -999 }
    assert_equal 70, user_coins(:bob_coin).reload.coin, "잔액보다 큰 차감은 거부"
  end

  test "coins index lists histories" do
    post admin_coins_path, params: { user_id: users(:bob).id, amount: 100 }
    get admin_coins_path
    assert_response :success
    assert_match "수동지급", response.body
  end

  # ── 유저 정지 ────────────────────────────────────────────

  test "suspends user, revokes existing tokens, blocks login, then unsuspends" do
    user = users(:bob)

    # 정지 전: 토큰 발급 + API 접근 정상
    headers = auth_headers_for(user)
    get "/api/v/me", headers: headers
    assert_response :success

    patch suspend_admin_user_path(user)
    assert user.reload.suspended?
    assert_equal 0, user.allowlisted_jwts.count, "정지 시 allowlist 비워 기존 토큰 무효화"

    # 기존 토큰으로 접근 차단
    get "/api/v/me", headers: headers
    assert_response :unauthorized

    # 신규 로그인도 차단
    post "/api/v/users/sign_in",
         params: { user: { email: user.email, password: "password123" } }, as: :json
    assert_response :unauthorized

    patch unsuspend_admin_user_path(user)
    assert_not user.reload.suspended?

    post "/api/v/users/sign_in",
         params: { user: { email: user.email, password: "password123" } }, as: :json
    assert_response :success
  end

  test "users index filters suspended" do
    users(:bob).suspend!
    get admin_users_path(filter: "suspended")
    assert_response :success
    assert_match users(:bob).email, response.body
    assert_no_match users(:alice).email, response.body
  end

  # ── 검색 ────────────────────────────────────────────────

  test "searches users by email" do
    get admin_users_path(q: "alice")
    assert_match users(:alice).email, response.body
    assert_no_match users(:bob).email, response.body
  end

  test "searches posts by title" do
    get admin_posts_path(q: "테스트 포스트")
    assert_response :success
    assert_match "테스트 포스트", response.body
  end

  # ── 인증 가드 ────────────────────────────────────────────

  test "all new admin actions require login" do
    delete admin_logout_path

    get admin_issues_path
    assert_redirected_to admin_login_path

    patch approve_admin_creator_path(creator_users(:bob_creator))
    assert_redirected_to admin_login_path
    assert creator_users(:bob_creator).reload.status_pending?

    post admin_coins_path, params: { user_id: users(:bob).id, amount: 999 }
    assert_redirected_to admin_login_path
  end
end
