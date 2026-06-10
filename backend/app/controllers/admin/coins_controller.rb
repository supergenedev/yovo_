class Admin::CoinsController < Admin::BaseController
  def index
    histories = UserCoinHistory.includes(:user).order(created_at: :desc)
    histories = histories.where(user_id: params[:user_id]) if params[:user_id].present?
    histories = histories.where(history_type: params[:history_type]) if params[:history_type].present?
    @pagy, @histories = pagy(histories)
  end

  # 수동 지급(양수)/차감(음수). 차감 시 잔액 음수 방지.
  def create
    user = User.find(params[:user_id])
    amount = params[:amount].to_i
    if amount.zero?
      return redirect_back fallback_location: admin_coins_path, alert: "0이 아닌 금액을 입력하세요."
    end

    user_coin = UserCoin.find_or_create_by!(user: user)
    ApplicationRecord.transaction do
      user_coin.lock!
      if amount.negative? && user_coin.coin + amount < 0
        return redirect_back fallback_location: admin_coins_path, alert: "잔액(#{user_coin.coin})보다 큰 금액을 차감할 수 없습니다."
      end

      prev_coin = user_coin.coin
      user_coin.update!(coin: prev_coin + amount)
      UserCoinHistory.create!(
        user:         user,
        user_coin:    user_coin,
        target:       user_coin,
        history_type: "admin_grant",
        amount:       amount,
        prev_coin:    prev_coin,
        current_coin: user_coin.coin,
      )
    end
    redirect_back fallback_location: admin_user_path(user),
                  notice: "#{user.nickname}에게 #{amount > 0 ? '+' : ''}#{amount} 코인을 반영했습니다. (잔액 #{user_coin.reload.coin})"
  end
end
