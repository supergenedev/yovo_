require "test_helper"

module Api
  module Studio
    class PostsControllerTest < ActionDispatch::IntegrationTest
      setup do
        @active = users(:alice)   # alice_creator: status active
        @pending = users(:bob)    # bob_creator: status pending
      end

      test "active creator can publish a post" do
        headers = auth_headers_for(@active)
        assert_difference -> { creator_users(:alice_creator).posts.count }, 1 do
          post "/api/studio/posts",
               params: { title_ko: "새 작품", body_ko: "본문", content_type: "video", view_type: "everyone", status: "published" },
               headers: headers, as: :json
        end
        assert_response :created
        assert_equal "새 작품", response.parsed_body.dig("post", "title_ko")
        assert_equal "published", response.parsed_body.dig("post", "status")
      end

      test "create attaches uploaded media" do
        headers = auth_headers_for(@active)
        file = Rack::Test::UploadedFile.new(StringIO.new("imgdata"), "image/jpeg", original_filename: "a.jpg")
        post "/api/studio/posts",
             params: { title_ko: "미디어 포스트", content_type: "image", view_type: "everyone", status: "published", media: [ file ] },
             headers: headers
        assert_response :created
        created = Post.find(response.parsed_body.dig("post", "id"))
        assert_equal 1, created.media.count, "업로드한 미디어가 첨부돼야 한다"
      end

      test "pending creator cannot post (admin approval required)" do
        headers = auth_headers_for(@pending)
        assert_no_difference -> { Post.count } do
          post "/api/studio/posts",
               params: { title_ko: "거절될 포스트", content_type: "video", view_type: "everyone", status: "published" },
               headers: headers, as: :json
        end
        assert_response :forbidden
      end
    end
  end
end
