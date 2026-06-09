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
  end
end
