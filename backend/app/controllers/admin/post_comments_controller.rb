class Admin::PostCommentsController < Admin::BaseController
  def index
    comments = PostComment.includes(:commenter, :post).order(created_at: :desc)
    if params[:q].present?
      comments = comments.where("text LIKE :q", q: "%#{PostComment.sanitize_sql_like(params[:q])}%")
    end
    @pagy, @comments = pagy(comments)
  end

  def destroy
    comment = PostComment.find(params[:id])
    comment.destroy!
    redirect_back fallback_location: admin_post_comments_path, notice: "댓글을 삭제했습니다."
  end
end
