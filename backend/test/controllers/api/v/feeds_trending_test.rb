require "test_helper"

module Api
  module V
    class FeedsTrendingTest < ActionDispatch::IntegrationTest
      setup do
        @user = users(:bob)
        @headers = auth_headers_for(@user)
        @creator = creator_users(:alice_creator)
      end

      test "trending orders by likes+comments desc, then oldest first on ties" do
        # 합산 점수: low=1, mid=5, high=5(동률) → high가 mid보다 먼저 생성됨
        low  = @creator.posts.create!(title_ko: "낮음", status: :published, content_type: :video, view_type: :everyone, likes_count: 1, comments_count: 0)
        high = @creator.posts.create!(title_ko: "높음-먼저", status: :published, content_type: :video, view_type: :everyone, likes_count: 3, comments_count: 2)
        mid  = @creator.posts.create!(title_ko: "높음-나중", status: :published, content_type: :video, view_type: :everyone, likes_count: 2, comments_count: 3)

        get "/api/v/feeds/trending", params: { limit: 10 }, headers: @headers, as: :json
        assert_response :success

        ids = response.parsed_body["posts"].map { |p| p["id"].to_i }
        rank_high = ids.index(high.id)
        rank_mid  = ids.index(mid.id)
        rank_low  = ids.index(low.id)

        assert rank_high < rank_low, "점수 높은 글이 낮은 글보다 위여야 한다"
        assert rank_mid  < rank_low, "점수 높은 글이 낮은 글보다 위여야 한다"
        assert rank_high < rank_mid, "동률(5=5)이면 먼저 생성된 글이 위여야 한다"
      end

      test "trending excludes drafts" do
        draft = @creator.posts.create!(title_ko: "초안", status: :draft, content_type: :video, view_type: :everyone, likes_count: 999)
        get "/api/v/feeds/trending", params: { limit: 50 }, headers: @headers, as: :json
        assert_response :success
        ids = response.parsed_body["posts"].map { |p| p["id"].to_i }
        assert_not_includes ids, draft.id, "초안은 트렌딩에 노출되지 않아야 한다"
      end
    end
  end
end
