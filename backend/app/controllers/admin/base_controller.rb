class Admin::BaseController < ActionController::Base
  layout "admin"
  before_action :require_admin_login

  include Pagy::Backend
  helper Pagy::Frontend

  private

  def require_admin_login
    unless session[:admin_user_id]
      redirect_to admin_login_path, alert: "로그인이 필요합니다."
    end
  end

  def current_admin
    @current_admin ||= AdminUser.find_by(id: session[:admin_user_id])
  end
  helper_method :current_admin

  def pagy_get_vars(collection, vars)
    vars[:items] ||= 20
    vars[:page] ||= params[:page]
    vars
  end
end
