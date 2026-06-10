# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

# 운영에서는 CORS_ORIGINS 환경변수(콤마 구분)로 허용 오리진을 제한한다.
# 미설정 시 기존 동작(전체 허용)을 유지하되, 운영 배포 전 반드시 설정할 것.
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins(*(ENV["CORS_ORIGINS"]&.split(",")&.map(&:strip).presence || ["*"]))
    resource "*", headers: :any, methods: :any,
                  expose: ["Authorization"]
  end
end
