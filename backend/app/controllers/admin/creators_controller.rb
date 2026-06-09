class Admin::CreatorsController < Admin::BaseController
  def index
    @pagy, @creators = pagy(CreatorUser.order(created_at: :desc))
  end

  def show
    @creator = CreatorUser.find(params[:id])
    @posts = @creator.posts.order(created_at: :desc).limit(10)
  end
end
