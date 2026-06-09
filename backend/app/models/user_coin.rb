class UserCoin < ApplicationRecord
  belongs_to :user
  has_many :user_coin_histories
end
