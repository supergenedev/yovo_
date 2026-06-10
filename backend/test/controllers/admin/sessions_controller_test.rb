require "test_helper"

class Admin::SessionsControllerTest < ActionDispatch::IntegrationTest
  test "shows login form" do
    get admin_login_path
    assert_response :success
  end

  test "redirects to admin root when already logged in" do
    post admin_login_path, params: { email: admin_users(:one).email, password: "password123" }
    get admin_login_path
    assert_redirected_to admin_root_path
  end

  test "logs in with valid credentials" do
    post admin_login_path, params: { email: admin_users(:one).email, password: "password123" }
    assert_redirected_to admin_root_path
  end

  test "rejects invalid credentials" do
    post admin_login_path, params: { email: admin_users(:one).email, password: "wrong" }
    assert_response :unprocessable_entity
  end

  test "logout redirects to login page" do
    post admin_login_path, params: { email: admin_users(:one).email, password: "password123" }
    delete admin_logout_path
    assert_redirected_to admin_login_path
  end

  test "after logout cannot access admin pages" do
    post admin_login_path, params: { email: admin_users(:one).email, password: "password123" }
    delete admin_logout_path
    get admin_root_path
    assert_redirected_to admin_login_path
  end
end
