ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

module ActiveSupport
  class TestCase
    # PostgreSQL + macOS arm64 + ruby 3.4에서 fork된 병렬 워커가 pg로 접속하면
    # connect_start에서 segfault가 난다(fork-safety 이슈). 병렬을 끈다.
    # CI(Linux)에서 병렬을 쓰려면 PARALLEL_WORKERS 환경변수로 켤 수 있다.
    parallelize(workers: Integer(ENV.fetch("PARALLEL_WORKERS", "1")))

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...
  end
end

module ApiAuthHelper
  # JWT 발급은 devise 세션 API를 그대로 사용한다 (픽스처 비밀번호: password123)
  def auth_headers_for(user, password: "password123")
    post "/api/v/users/sign_in",
         params: { user: { email: user.email, password: } },
         as: :json
    assert_response :success, "테스트 로그인 실패: #{response.body}"
    token = response.parsed_body.dig("user", "access_token")
    { "Authorization" => "Bearer #{token}" }
  end
end

class ActionDispatch::IntegrationTest
  include ApiAuthHelper
end
