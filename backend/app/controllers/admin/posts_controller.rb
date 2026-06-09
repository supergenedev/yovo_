class Admin::PostsController < Admin::BaseController
  def index
    @pagy, @posts = pagy(Post.includes(:creator_user).order(created_at: :desc))
  end

  def show
    @post = Post.includes(:creator_user, :post_comments).find(params[:id])
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    redirect_to admin_posts_path, notice: "포스트를 삭제했습니다."
  end
end
