require "test_helper"

class AdminUserTest < ActiveSupport::TestCase
  test "valid with email and password" do
    admin = AdminUser.new(email: "new@example.com", password: "password123")
    assert admin.valid?
  end

  test "invalid without email" do
    admin = AdminUser.new(password: "password123")
    assert_not admin.valid?
    assert_includes admin.errors[:email], "can't be blank"
  end

  test "email must be unique" do
    duplicate = AdminUser.new(email: admin_users(:one).email, password: "password123")
    assert_not duplicate.valid?
    assert_includes duplicate.errors[:email], "has already been taken"
  end

  test "authenticates with correct password" do
    assert admin_users(:one).authenticate("password123")
  end

  test "rejects wrong password" do
    assert_not admin_users(:one).authenticate("wrongpassword")
  end
end
