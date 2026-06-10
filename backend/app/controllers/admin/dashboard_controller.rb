class Admin::DashboardController < Admin::BaseController
  def index
    @stats = {
      users:         User.count,
      creators:      CreatorUser.count,
      posts:         Post.count,
      comments:      PostComment.count,
      follows:       Follow.count,
      notifications: Notification.count
    }
    @recent_users = User.order(created_at: :desc).limit(5)
    @recent_posts = Post.includes(:creator_user).order(created_at: :desc).limit(5)
    # 운영자 액션이 필요한 항목
    @pending_creators  = CreatorUser.where(status: :pending).count
    @unresolved_issues = Issue.unresolved.count
  end
end
