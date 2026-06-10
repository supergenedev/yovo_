require "test_helper"

class Admin::CreatorsControllerTest < ActionDispatch::IntegrationTest
  setup do
    post admin_login_path, params: { email: admin_users(:one).email, password: "password123" }
  end

  test "redirects unauthenticated request to login" do
    delete admin_logout_path
    get admin_creators_path
    assert_redirected_to admin_login_path
  end

  test "lists creators" do
    get admin_creators_path
    assert_response :success
  end

  test "shows creator detail" do
    get admin_creator_path(creator_users(:alice_creator))
    assert_response :success
  end
end
