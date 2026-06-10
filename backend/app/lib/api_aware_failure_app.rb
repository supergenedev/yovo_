# Devise 인증 실패 처리: API 경로는 브라우저 리다이렉트 대신 401 JSON을 반환한다.
class ApiAwareFailureApp < Devise::FailureApp
  def respond
    # warden이 PATH_INFO를 재작성하므로 원 요청 경로는 attempted_path로 확인한다
    attempted = warden_options&.dig(:attempted_path).to_s
    if attempted.start_with?("/api/") || request.path.start_with?("/api/")
      self.status        = 401
      self.content_type  = "application/json"
      self.response_body = {
        code: 401, type: "unauthorized",
        message: i18n_message, title: nil,
      }.to_json
    else
      super
    end
  end
end
