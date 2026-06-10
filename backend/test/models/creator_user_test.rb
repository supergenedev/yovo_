require "test_helper"

class CreatorUserTest < ActiveSupport::TestCase
  test "nickname is required" do
    creator = CreatorUser.new(user: users(:bob))
    assert_not creator.valid?
    assert_includes creator.errors[:nickname], "can't be blank"
  end

  test "username format validation rejects special characters" do
    creator = CreatorUser.new(user: users(:bob), nickname: "Test", username: "invalid name!")
    assert_not creator.valid?
    assert creator.errors[:username].any?
  end

  test "fixture alice_creator is active" do
    assert creator_users(:alice_creator).status_active?
  end

  test "active_creators scope returns only active creators" do
    creators = CreatorUser.active_creators
    assert_includes creators, creator_users(:alice_creator)
  end

  test "status transitions: active -> inactive -> active" do
    creator = creator_users(:alice_creator)
    creator.status_inactive!
    assert creator.reload.status_inactive?
    creator.status_active!
    assert creator.reload.status_active?
  end

  test "search_and_order returns none for blank query" do
    assert_equal 0, CreatorUser.search_and_order("").count
  end

  test "search_and_order finds by nickname" do
    results = CreatorUser.search_and_order("AliceCreator")
    assert_includes results, creator_users(:alice_creator)
  end
end
