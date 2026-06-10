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

      test "show requires authentication" do
        get "/api/v/posts/#{@post.id}"
        assert_response :unauthorized
      end
    end
  end
end
