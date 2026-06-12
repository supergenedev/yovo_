module Api
  module V
    class UserCoinHistorySerializer < ApplicationSerializer
      attributes :history_type, :amount, :prev_coin, :current_coin

      # 내역 표시용 라벨: 포스트면 제목, 충전이면 "충전"
      attribute :target_label do
        case object.target
        when Post then object.target.title_ko
        when User then "충전"
        else object.target_type
        end
      rescue StandardError
        nil
      end

      attribute :creator_nickname do
        object.creator_user&.nickname
      end
    end
  end
end
