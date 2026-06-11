require "test_helper"

module Api
  module V
    class MeControllerTest < ActionDispatch::IntegrationTest
      setup do
        @user = users(:bob)
        @headers = auth_headers_for(@user)
      end

      test "show returns my profile with creator status" do
        get "/api/v/me", headers: @headers
        assert_response :success

        body = response.parsed_body["user"]
        assert_equal "Bob", body["nickname"]
        # bob은 픽스처에서 pending 크리에이터
        assert_equal "pending", body.dig("creator_user", "status")
      end

      test "show returns null creator_user when not a creator" do
        # alice는 크리에이터지만 검증 위해 신규 유저 생성
        fresh = User.create!(email: "nocreator@example.com", password: "password123",
                             nickname: "일반인", jti: SecureRandom.uuid)
        headers = auth_headers_for(fresh)

        get "/api/v/me", headers: headers
        assert_nil response.parsed_body.dig("user", "creator_user")
      end

      test "update changes nickname and introduction" do
        patch "/api/v/me", params: { nickname: "새닉네임", introduction: "안녕하세요" },
              headers: @headers, as: :json
        assert_response :success
        assert_equal "새닉네임", @user.reload.nickname
        assert_equal "안녕하세요", @user.introduction
      end

      test "coin returns my balance" do
        user_coins(:bob_coin).update!(coin: 77)
        get "/api/v/me/coin", headers: @headers
        assert_response :success
        assert_equal 77, response.parsed_body.dig("user_coin", "coin")
      end

      test "apply_creator creates pending creator and rejects duplicates" do
        fresh = User.create!(email: "applicant@example.com", password: "password123",
                             nickname: "지망생", jti: SecureRandom.uuid)
        headers = auth_headers_for(fresh)

        post "/api/v/me/apply_creator", headers: headers
        assert_response :success
        assert fresh.reload.creator_user.status_pending?

        post "/api/v/me/apply_creator", headers: headers
        assert_response :bad_request
      end
    end
  end
end
