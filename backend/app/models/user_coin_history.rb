class UserCoinHistory < ApplicationRecord
  belongs_to :user
  belongs_to :user_coin
  belongs_to :creator_user, optional: true
  belongs_to :target, polymorphic: true
end
