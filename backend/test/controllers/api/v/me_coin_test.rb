require "test_helper"

module Api
  module V
    class MeCoinTest < ActionDispatch::IntegrationTest
      setup do
        @user = users(:bob)
        @headers = auth_headers_for(@user)
      end

      # ── POST /api/v/me/charge ─────────────────────────────

      test "charge increments coin and creates a charge history" do
        user_coins(:bob_coin).update!(coin: 50)

        assert_difference -> { user_coins(:bob_coin).reload.coin }, 100 do
          assert_difference -> { UserCoinHistory.count }, 1 do
            post "/api/v/me/charge", params: { amount: 100 }, headers: @headers, as: :json
          end
        end
        assert_response :success
        assert_equal 150, response.parsed_body.dig("user_coin", "coin")

        history = UserCoinHistory.order(:id).last
        assert_equal "charge", history.history_type
        assert_equal 100, history.amount
        assert_equal 50, history.prev_coin
        assert_equal 150, history.current_coin
        assert_equal @user, history.user
        assert_equal @user, history.target
      end

      test "charge creates user_coin when user has none" do
        fresh = User.create!(email: "fresh@example.com", password: "password123", nickname: "Fresh")
        fresh.user_coin&.destroy! # after_create로 생긴 코인을 지워 find_or_create 경로를 검증
        fresh.reload
        assert_nil fresh.user_coin

        headers = auth_headers_for(fresh)
        post "/api/v/me/charge", params: { amount: 30 }, headers: headers, as: :json

        assert_response :success
        assert_equal 30, response.parsed_body.dig("user_coin", "coin")
        coin = UserCoin.find_by!(user: fresh)
        assert_equal 30, coin.coin
        assert UserCoinHistory.exists?(user: fresh, user_coin: coin, history_type: "charge", amount: 30)
      end

      test "charge rejects zero and negative amount" do
        user_coins(:bob_coin).update!(coin: 10)

        [ 0, -5 ].each do |amount|
          assert_no_difference -> { UserCoinHistory.count } do
            post "/api/v/me/charge", params: { amount: }, headers: @headers, as: :json
          end
          assert_response :bad_request
          assert_equal 10, user_coins(:bob_coin).reload.coin
        end
      end

      test "charge rejects amount over 1,000,000" do
        user_coins(:bob_coin).update!(coin: 10)

        assert_no_difference -> { UserCoinHistory.count } do
          post "/api/v/me/charge", params: { amount: 1_000_001 }, headers: @headers, as: :json
        end
        assert_response :bad_request
        assert_equal 10, user_coins(:bob_coin).reload.coin
      end

      # ── GET /api/v/me/coin_histories ──────────────────────

      test "coin_histories returns only my histories, newest first" do
        post "/api/v/me/charge", params: { amount: 10 }, headers: @headers, as: :json
        post "/api/v/me/charge", params: { amount: 20 }, headers: @headers, as: :json

        # 다른 유저(alice)의 이력은 보이면 안 된다
        alice_headers = auth_headers_for(users(:alice))
        post "/api/v/me/charge", params: { amount: 999 }, headers: alice_headers, as: :json

        get "/api/v/me/coin_histories", headers: @headers, as: :json
        assert_response :success

        data = response.parsed_body["data"]
        assert_equal 2, data.size
        assert_equal [ 20, 10 ], data.map { |h| h["amount"] }, "최신순이어야 한다"
        refute data.any? { |h| h["amount"] == 999 }, "다른 유저의 이력이 섞이면 안 된다"
        assert response.parsed_body["meta"].present?
      end

      test "coin_histories serializes charge history fields" do
        user_coins(:bob_coin).update!(coin: 0)
        post "/api/v/me/charge", params: { amount: 70 }, headers: @headers, as: :json

        get "/api/v/me/coin_histories", headers: @headers, as: :json
        assert_response :success

        item = response.parsed_body["data"].first
        assert_equal "charge", item["history_type"]
        assert_equal 70, item["amount"]
        assert_equal 0, item["prev_coin"]
        assert_equal 70, item["current_coin"]
        assert_equal "충전", item["target_label"]
        assert_nil item["creator_nickname"]
        assert item["created_at"].is_a?(Integer)
      end
    end
  end
end
