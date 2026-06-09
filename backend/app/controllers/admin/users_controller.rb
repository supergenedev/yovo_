class Admin::UsersController < Admin::BaseController
  def index
    @pagy, @users = pagy(User.order(created_at: :desc))
  end

  def show
    @user = User.find(params[:id])
    @posts_liked = PostLike.where(user_id: @user.id).count
    @follows = Follow.where(user_id: @user.id).count
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to admin_users_path, notice: "유저를 삭제했습니다."
  end
end
