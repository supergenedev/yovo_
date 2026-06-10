require "test_helper"

module Api
  module V
    class PostCommentsControllerTest < ActionDispatch::IntegrationTest
      setup do
        @user = users(:bob)
        @post = posts(:published_post)
        @headers = auth_headers_for(@user)
      end

      test "index returns top-level comments oldest first" do
        old = @post.post_comments.create!(commenter: @user, text: "첫 댓글", created_at: 2.hours.ago)
        new = @post.post_comments.create!(commenter: @user, text: "둘째 댓글", created_at: 1.hour.ago)
        reply = @post.post_comments.create!(commenter: @user, text: "답글", parent_id: old.id)

        get "/api/v/posts/#{@post.id}/post_comments", headers: @headers
        assert_response :success

        ids = response.parsed_body["post_comments"].map { |c| c["id"] }
        assert_includes ids, old.id.to_s
        assert_includes ids, new.id.to_s
        refute_includes ids, reply.id.to_s, "대댓글은 최상위 목록에서 제외"
        assert_equal ids.index(old.id.to_s) < ids.index(new.id.to_s), true
      end

      test "create adds comment and increments counter" do
        assert_difference -> { @post.reload.post_comments.count }, 1 do
          post "/api/v/posts/#{@post.id}/post_comments",
               params: { text: "새 댓글입니다" },
               headers: @headers, as: :json
        end
        assert_response :created
        assert_equal "새 댓글입니다", response.parsed_body.dig("post_comment", "text")
      end

      test "update only allows own comment" do
        mine = @post.post_comments.create!(commenter: @user, text: "내 댓글")
        others = @post.post_comments.create!(commenter: users(:alice), text: "남의 댓글")

        patch "/api/v/posts/#{@post.id}/post_comments/#{mine.id}",
              params: { text: "수정됨" }, headers: @headers, as: :json
        assert_response :success
        assert_equal "수정됨", mine.reload.text

        patch "/api/v/posts/#{@post.id}/post_comments/#{others.id}",
              params: { text: "해킹" }, headers: @headers, as: :json
        assert_response :bad_request
      end

      test "destroy removes own comment" do
        mine = @post.post_comments.create!(commenter: @user, text: "지울 댓글")
        assert_difference -> { PostComment.count }, -1 do
          delete "/api/v/post_comments/#{mine.id}", headers: @headers
        end
        assert_response :success
      end

      test "comment like toggle" do
        comment = @post.post_comments.create!(commenter: users(:alice), text: "좋아요 대상")

        post "/api/v/post_comments/#{comment.id}/post_comment_likes", headers: @headers
        assert_response :success

        delete "/api/v/post_comments/#{comment.id}/post_comment_likes", headers: @headers
        assert_response :success
      end
    end
  end
end
