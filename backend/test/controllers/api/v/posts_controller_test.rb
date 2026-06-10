require "test_helper"

module Api
  module V
    class PostsControllerTest < ActionDispatch::IntegrationTest
      setup do
        @user = users(:bob)
        @post = posts(:published_post)
        @headers = auth_headers_for(@user)
      end

      test "show returns post with empty media when none attached" do
        get "/api/v/posts/#{@post.id}", headers: @headers
        assert_response :success

        body = response.parsed_body["post"]
        assert_equal @post.id.to_s, body["id"]
        assert_equal [], body["media"]
      end

      test "show returns attached media with blob url and content type" do
        @post.media.attach(
          io: StringIO.new("fake video bytes"),
          filename: "clip.mp4",
          content_type: "video/mp4",
        )

        get "/api/v/posts/#{@post.id}", headers: @headers
        assert_response :success

        media = response.parsed_body.dig("post", "media")
        assert_equal 1, media.length
        assert_equal "video/mp4", media.first["content_type"]
        assert_equal "clip.mp4", media.first["filename"]
        assert_match %r{\A/rails/active_storage/blobs/}, media.first["url"]
      end

      test "buyer_only post hides media until purchased" do
        locked = posts(:published_post)
        locked.update!(view_type: :buyer_only, content_price: 50)
        locked.media.attach(
          io: StringIO.new("locked video"),
          filename: "locked.mp4",
          content_type: "video/mp4",
        )

        get "/api/v/posts/#{locked.id}", headers: @headers
        assert_equal [], response.parsed_body.dig("post", "media"), "구매 전에는 미디어가 잠겨야 한다"

        # 구매 후에는 보여야 한다
        user_coins(:bob_coin).update!(coin: 100)
        post "/api/v/posts/#{locked.id}/purchase", headers: @headers
        assert_response :success

        get "/api/v/posts/#{locked.id}", headers: @headers
        assert_equal 1, response.parsed_body.dig("post", "media").length
      end

      test "creator sees own buyer_only media without purchase" do
        locked = posts(:published_post)
        locked.update!(view_type: :buyer_only, content_price: 50)
        locked.media.attach(
          io: StringIO.new("own video"),
          filename: "own.mp4",
          content_type: "video/mp4",
        )

        owner_headers = auth_headers_for(users(:alice))
        get "/api/v/posts/#{locked.id}", headers: owner_headers
        assert_equal 1, response.parsed_body.dig("post", "media").length
      end

      test "purchase fails with insufficient coins" do
        locked = posts(:published_post)
        locked.update!(view_type: :buyer_only, content_price: 9999)

        post "/api/v/posts/#{locked.id}/purchase", headers: @headers
        assert_response :bad_request
      end

      test "purchase is idempotent — repeat call charges only once" do
        locked = posts(:published_post)
        locked.update!(view_type: :buyer_only, content_price: 50)
        user_coins(:bob_coin).update!(coin: 100)

        post "/api/v/posts/#{locked.id}/purchase", headers: @headers
        assert_response :success
        assert_equal 50, user_coins(:bob_coin).reload.coin

        post "/api/v/posts/#{locked.id}/purchase", headers: @headers
        assert_response :success
        assert_equal 50, user_coins(:bob_coin).reload.coin, "재구매 호출 시 코인이 또 차감되면 안 된다"
        assert_equal 1, UserCoinHistory.where(user: @user, target: locked, history_type: "purchase").count
      end

      test "purchase records coin history and appears in purchased list" do
        locked = posts(:published_post)
        locked.update!(view_type: :buyer_only, content_price: 30)
        user_coins(:bob_coin).update!(coin: 100)

        post "/api/v/posts/#{locked.id}/purchase", headers: @headers
        assert_response :success
        assert response.parsed_body.dig("post", "interaction_with_me", "purchased")

        get "/api/v/me/posts", params: { filter: "purchased" }, headers: @headers
        assert_response :success
        ids = response.parsed_body["data"].map { |p| p["id"] }
        assert_includes ids, locked.id.to_s, "구매한 포스트가 구매 목록에 나와야 한다"
      end

      test "batch_seen marks posts seen but does NOT unlock paid media" do
        locked = posts(:published_post)
        locked.update!(view_type: :buyer_only, content_price: 50)
        locked.media.attach(io: StringIO.new("paid"), filename: "paid.mp4", content_type: "video/mp4")

        post "/api/v/posts/batch_seen", params: { post_ids: [ locked.id ] }, headers: @headers, as: :json
        assert_response :success
        assert PostSeen.exists?(user: @user, post_id: locked.id)

        get "/api/v/posts/#{locked.id}", headers: @headers
        body = response.parsed_body["post"]
        assert body.dig("interaction_with_me", "seen")
        assert_equal [], body["media"], "batch_seen으로 유료 미디어가 잠금 해제되면 안 된다 (구매 우회)"
      end

      test "batch_get returns posts for given ids" do
        post "/api/v/posts/batch_get", params: { post_ids: [ @post.id ] }, headers: @headers, as: :json
        assert_response :success
        assert_equal [ @post.id.to_s ], response.parsed_body["data"].map { |p| p["id"] }
      end

      test "show requires authentication" do
        get "/api/v/posts/#{@post.id}"
        assert_response :unauthorized
      end

      test "feeds/videos returns only video and episode posts regardless of follow" do
        @post.update!(content_type: :video) # published_post를 영상으로
        text_post = Post.create!(creator_user: creator_users(:alice_creator), title_ko: "텍스트", status: :published, content_type: :text, view_type: :everyone)

        get "/api/v/feeds/videos", headers: @headers
        assert_response :success

        types = response.parsed_body["data"].map { |p| p["content_type"] }
        assert_includes types, "video"
        assert types.all? { |t| %w[video episode].include?(t) }, "video/episode 외 타입이 섞이면 안 된다: #{types}"
        refute_includes response.parsed_body["data"].map { |p| p["id"] }, text_post.id.to_s
      end
    end
  end
end
