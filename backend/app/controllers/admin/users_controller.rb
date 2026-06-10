class Admin::UsersController < Admin::BaseController
  def index
    users = User.order(created_at: :desc)
    if params[:q].present?
      users = users.where("email LIKE :q OR nickname LIKE :q OR username LIKE :q",
                          q: "%#{User.sanitize_sql_like(params[:q])}%")
    end
    users = users.where.not(suspended_at: nil) if params[:filter] == "suspended"
    @pagy, @users = pagy(users)
  end

  def show
    @user = User.find(params[:id])
    @posts_liked = PostLike.where(user_id: @user.id).count
    @follows = Follow.where(user_id: @user.id).count
    @coin = UserCoin.find_by(user: @user)
    @coin_histories = UserCoinHistory.where(user: @user).order(created_at: :desc).limit(10)
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to admin_users_path, notice: "유저를 삭제했습니다."
  end

  def suspend
    user = User.find(params[:id])
    user.suspend!
    redirect_back fallback_location: admin_user_path(user), notice: "#{user.email}을 정지했습니다. (기존 토큰 무효화)"
  end

  def unsuspend
    user = User.find(params[:id])
    user.unsuspend!
    redirect_back fallback_location: admin_user_path(user), notice: "#{user.email}의 정지를 해제했습니다."
  end
end
