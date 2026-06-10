require "test_helper"

class Admin::DashboardControllerTest < ActionDispatch::IntegrationTest
  setup do
    post admin_login_path, params: { email: admin_users(:one).email, password: "password123" }
  end

  test "redirects unauthenticated request to login" do
    delete admin_logout_path
    get admin_root_path
    assert_redirected_to admin_login_path
  end

  test "shows dashboard to authenticated admin" do
    get admin_root_path
    assert_response :success
  end
end
