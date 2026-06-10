require "test_helper"

class Admin::UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    post admin_login_path, params: { email: admin_users(:one).email, password: "password123" }
  end

  test "redirects unauthenticated request to login" do
    delete admin_logout_path
    get admin_users_path
    assert_redirected_to admin_login_path
  end

  test "lists users" do
    get admin_users_path
    assert_response :success
  end

  test "shows user detail" do
    get admin_user_path(users(:alice))
    assert_response :success
  end

  test "destroys user and redirects" do
    assert_difference "User.count", -1 do
      delete admin_user_path(users(:bob))
    end
    assert_redirected_to admin_users_path
  end

  test "cannot destroy user when not logged in" do
    delete admin_logout_path
    assert_no_difference "User.count" do
      delete admin_user_path(users(:alice))
    end
    assert_redirected_to admin_login_path
  end
end
