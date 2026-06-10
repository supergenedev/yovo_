class Admin::PostsController < Admin::BaseController
  def index
    posts = Post.includes(:creator_user).order(created_at: :desc)
    if params[:q].present?
      q = "%#{Post.sanitize_sql_like(params[:q])}%"
      posts = posts.left_joins(:creator_user)
                   .where("posts.title_ko LIKE :q OR creator_users.nickname LIKE :q", q: q)
    end
    @pagy, @posts = pagy(posts)
  end

  def show
    @post = Post.includes(:creator_user).find(params[:id])
    @comments = @post.post_comments.includes(:commenter).order(created_at: :desc).limit(20)
    @issues = Issue.where(issuable: @post).order(created_at: :desc)
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    redirect_to admin_posts_path, notice: "포스트를 삭제했습니다."
  end
end
