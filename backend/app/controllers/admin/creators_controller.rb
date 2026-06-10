class Admin::CreatorsController < Admin::BaseController
  def index
    creators = CreatorUser.order(created_at: :desc)
    creators = creators.where(status: params[:status]) if params[:status].present?
    if params[:q].present?
      creators = creators.where("nickname LIKE :q OR username LIKE :q",
                                q: "%#{CreatorUser.sanitize_sql_like(params[:q])}%")
    end
    @pagy, @creators = pagy(creators)
    @status_counts = CreatorUser.group(:status).count
  end

  def show
    @creator = CreatorUser.find(params[:id])
    @posts = @creator.posts.order(created_at: :desc).limit(10)
  end

  def approve
    creator = CreatorUser.find(params[:id])
    creator.update!(status: :active)
    redirect_back fallback_location: admin_creators_path, notice: "#{creator.nickname} 크리에이터를 승인했습니다."
  end

  def reject
    creator = CreatorUser.find(params[:id])
    creator.update!(status: :inactive)
    redirect_back fallback_location: admin_creators_path, notice: "#{creator.nickname} 크리에이터를 거절/비활성화했습니다."
  end
end
