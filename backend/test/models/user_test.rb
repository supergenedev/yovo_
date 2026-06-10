require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "valid user" do
    user = User.new(email: "new@example.com", password: "password123", nickname: "NewUser")
    assert user.valid?
  end

  test "nickname is required" do
    user = User.new(email: "new@example.com", password: "password123")
    assert_not user.valid?
    assert_includes user.errors[:nickname], "can't be blank"
  end

  test "nickname max 30 characters" do
    user = User.new(email: "new@example.com", password: "password123", nickname: "a" * 31)
    assert_not user.valid?
    assert user.errors[:nickname].any?
  end

  test "username allows only alphanumeric and underscore" do
    user = User.new(email: "test@example.com", password: "password123", nickname: "test", username: "invalid name!")
    assert_not user.valid?
    assert user.errors[:username].any?
  end

  test "valid username format" do
    user = User.new(email: "test@example.com", password: "password123", nickname: "test", username: "valid_user_123")
    assert user.valid?
  end

  test "apply_as_creator creates pending creator" do
    assert_difference "CreatorUser.count", 1 do
      users(:bob).apply_as_creator!
    end
    assert users(:bob).reload.creator_user.status_pending?
  end

  test "apply_as_creator raises if already creator" do
    assert_raises(ArgumentError) { users(:alice).apply_as_creator! }
  end

  test "creates user_coin on user creation" do
    assert_difference "UserCoin.count", 1 do
      User.create!(email: "coin@example.com", password: "password123", nickname: "CoinTest", jti: SecureRandom.uuid)
    end
  end
end
