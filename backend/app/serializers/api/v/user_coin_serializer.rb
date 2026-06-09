module Api
  module V
    class UserCoinSerializer < ApplicationSerializer
      attribute :coin do
        object.coin
      end
    end
  end
end
