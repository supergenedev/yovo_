class Admin::SessionsController < ActionController::Base
  layout "admin"

  def new
    redirect_to admin_root_path if session[:admin_user_id]
  end

  def create
    admin = AdminUser.find_by(email: params[:email])
    if admin&.authenticate(params[:password])
      session[:admin_user_id] = admin.id
      redirect_to admin_root_path, notice: "로그인했습니다."
    else
      flash.now[:alert] = "이메일 또는 비밀번호가 잘못됐습니다."
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    session.delete(:admin_user_id)
    redirect_to admin_login_path, notice: "로그아웃했습니다."
  end
end
