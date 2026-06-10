class PostSeen < ApplicationRecord
  belongs_to :user
  belongs_to :post

  # referer 컬럼은 integer NOT NULL — enum 없이 심볼을 넣으면 nil로 캐스팅돼
  # NOT NULL 제약 위반이 난다 (posts#purchase에서 referer: :feed 사용)
  enum :referer, { feed: 0, post_view: 1, purchase: 2 }, prefix: :referer
end
