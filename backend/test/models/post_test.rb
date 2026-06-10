require "test_helper"

class PostTest < ActiveSupport::TestCase
  test "published scope returns only published posts" do
    assert_includes Post.published, posts(:published_post)
    assert_not_includes Post.published, posts(:draft_post)
  end

  test "status enum: published and draft" do
    assert posts(:published_post).published?
    assert posts(:draft_post).draft?
  end

  test "view_type enum defaults to everyone" do
    assert posts(:published_post).view_type_everyone?
  end

  test "content_type enum" do
    assert posts(:published_post).content_text?
  end

  test "belongs to creator_user" do
    assert_equal creator_users(:alice_creator), posts(:published_post).creator_user
  end

  test "feed_following returns published posts from followed creators only" do
    user = users(:bob)
    Follow.create!(user: user, creator_user: creator_users(:alice_creator))
    feed = Post.feed_following(user)
    assert_includes feed, posts(:published_post)
    assert_not_includes feed, posts(:draft_post)
  end

  test "feed_discover excludes posts from followed creators" do
    user = users(:bob)
    Follow.create!(user: user, creator_user: creator_users(:alice_creator))
    discover = Post.feed_discover(user)
    assert_not_includes discover, posts(:published_post)
  end
end
