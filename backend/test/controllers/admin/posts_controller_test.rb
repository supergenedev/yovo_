require "test_helper"

class Admin::PostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    post admin_login_path, params: { email: admin_users(:one).email, password: "password123" }
  end

  test "redirects unauthenticated request to login" do
    delete admin_logout_path
    get admin_posts_path
    assert_redirected_to admin_login_path
  end

  test "lists posts" do
    get admin_posts_path
    assert_response :success
  end

  test "shows post detail" do
    get admin_post_path(posts(:published_post))
    assert_response :success
  end

  test "destroys post and redirects" do
    assert_difference "Post.count", -1 do
      delete admin_post_path(posts(:published_post))
    end
    assert_redirected_to admin_posts_path
  end

  test "cannot destroy post when not logged in" do
    delete admin_logout_path
    assert_no_difference "Post.count" do
      delete admin_post_path(posts(:draft_post))
    end
    assert_redirected_to admin_login_path
  end
end
