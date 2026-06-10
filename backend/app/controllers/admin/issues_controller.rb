class Admin::IssuesController < Admin::BaseController
  def index
    issues = Issue.includes(:user, :issuable).order(created_at: :desc)
    issues = params[:filter] == "resolved" ? issues.resolved : issues.unresolved unless params[:filter] == "all"
    @pagy, @issues = pagy(issues)
    @unresolved_count = Issue.unresolved.count
  end

  def resolve
    issue = Issue.find(params[:id])
    issue.resolve!
    redirect_back fallback_location: admin_issues_path, notice: "신고 ##{issue.id}를 처리 완료했습니다."
  end
end
