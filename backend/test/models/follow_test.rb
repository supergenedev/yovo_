require "test_helper"

class FollowTest < ActiveSupport::TestCase
  test "creates chat room after follow" do
    assert_difference "ChatRoom.count", 1 do
      Follow.create!(user: users(:bob), creator_user: creator_users(:alice_creator))
    end
  end

  test "does not create chat room when user follows own creator profile" do
    # alice_creator belongs to alice — self-follow should not open a chat room
    assert_no_difference "ChatRoom.count" do
      Follow.create!(user: users(:alice), creator_user: creator_users(:alice_creator))
    end
  end

  test "raises on duplicate follow" do
    Follow.create!(user: users(:bob), creator_user: creator_users(:alice_creator))
    assert_raises(ActiveRecord::RecordNotUnique) do
      Follow.create!(user: users(:bob), creator_user: creator_users(:alice_creator))
    end
  end
end
