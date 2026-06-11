require "test_helper"

module Api
  module V
    class PostTipsControllerTest < ActionDispatch::IntegrationTest
      setup do
        @user = users(:bob) # alice의 포스트에 bob이 팁
        @post = posts(:published_post)
        @headers = auth_headers_for(@user)
      end

      test "create tip increments post tip_amount and deducts coins" do
        user_coins(:bob_coin).update!(coin: 100)

        assert_difference -> { @post.reload.tip_amount }, 30 do
          post "/api/v/posts/#{@post.id}/post_tips",
               params: { amount: 30 }, headers: @headers, as: :json
        end
        assert_response :success
        assert_equal 30, response.parsed_body.dig("post_tip", "amount")
        assert_equal 70, user_coins(:bob_coin).reload.coin, "팁 금액만큼 코인이 차감돼야 한다"
        assert UserCoinHistory.exists?(user: @user, target: @post, history_type: "tip")
      end

      test "tip fails with insufficient coins" do
        user_coins(:bob_coin).update!(coin: 5)

        assert_no_difference -> { @post.reload.tip_amount } do
          post "/api/v/posts/#{@post.id}/post_tips",
               params: { amount: 30 }, headers: @headers, as: :json
        end
        assert_response :bad_request
        assert_equal 5, user_coins(:bob_coin).reload.coin
      end

      test "cannot tip own post" do
        owner_headers = auth_headers_for(users(:alice))
        post "/api/v/posts/#{@post.id}/post_tips",
             params: { amount: 10 }, headers: owner_headers, as: :json
        assert_response :bad_request
      end

      test "tip succeeds and serializes avatar as relative path (no host needed)" do
        user_coins(:bob_coin).update!(coin: 100)
        @user.profile_image.attach(io: StringIO.new("img"), filename: "a.jpg", content_type: "image/jpeg")

        post "/api/v/posts/#{@post.id}/post_tips",
             params: { amount: 10 }, headers: @headers, as: :json
        assert_response :success # url_for였다면 여기서 500 (Missing host)

        img = response.parsed_body.dig("post_tip", "user", "profile_image")
        assert_match %r{\A/rails/active_storage/}, img, "절대 URL이 아닌 상대 경로여야 한다"
      end

      test "rejects non-positive amount" do
        post "/api/v/posts/#{@post.id}/post_tips",
             params: { amount: 0 }, headers: @headers, as: :json
        assert_response :bad_request
      end
    end
  end
end
