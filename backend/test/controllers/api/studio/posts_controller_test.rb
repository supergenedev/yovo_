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

      test "thumbnail attaches image without removing existing video media" do
        headers = auth_headers_for(@active)
        post = creator_users(:alice_creator).posts.create!(title_ko: "영상", content_type: :video, view_type: :everyone, status: :published)
        post.media.attach(io: StringIO.new("vid"), filename: "v.mp4", content_type: "video/mp4")
        assert_equal 1, post.media.count

        thumb = Rack::Test::UploadedFile.new(StringIO.new("img"), "image/jpeg", original_filename: "t.jpg")
        post "/api/studio/posts/#{post.id}/thumbnail", params: { thumbnail: thumb }, headers: headers

        assert_response :success
        post.reload
        assert_equal 2, post.media.count, "기존 영상은 유지되고 썸네일이 추가돼야 한다"
        types = post.media.map { |m| m.content_type }
        assert_includes types, "video/mp4"
        assert_includes types, "image/jpeg"
      end

      test "cannot attach thumbnail to another creator's post" do
        headers = auth_headers_for(@active)
        # bob_creator(pending)이지만 소유권 검증만 보기 위해 alice가 타인 글에 접근 시도
        others = creator_users(:bob_creator).posts.create!(title_ko: "남의글", content_type: :video, view_type: :everyone, status: :published)
        thumb = Rack::Test::UploadedFile.new(StringIO.new("img"), "image/jpeg", original_filename: "t.jpg")
        post "/api/studio/posts/#{others.id}/thumbnail", params: { thumbnail: thumb }, headers: headers
        assert_response :not_found
        assert_equal 0, others.reload.media.count
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
