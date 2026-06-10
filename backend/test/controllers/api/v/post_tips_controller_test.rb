require "test_helper"

module Api
  module V
    class PostTipsControllerTest < ActionDispatch::IntegrationTest
      setup do
        @user = users(:bob) # alice의 포스트에 bob이 팁
        @post = posts(:published_post)
        @headers = auth_headers_for(@user)
      end

      test "create tip increments post tip_amount" do
        assert_difference -> { @post.reload.tip_amount }, 30 do
          post "/api/v/posts/#{@post.id}/post_tips",
               params: { amount: 30 }, headers: @headers, as: :json
        end
        assert_response :success
        assert_equal 30, response.parsed_body.dig("post_tip", "amount")
      end

      test "cannot tip own post" do
        owner_headers = auth_headers_for(users(:alice))
        post "/api/v/posts/#{@post.id}/post_tips",
             params: { amount: 10 }, headers: owner_headers, as: :json
        assert_response :bad_request
      end

      test "rejects non-positive amount" do
        post "/api/v/posts/#{@post.id}/post_tips",
             params: { amount: 0 }, headers: @headers, as: :json
        assert_response :bad_request
      end
    end
  end
end
