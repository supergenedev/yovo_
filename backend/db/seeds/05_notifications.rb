puts "[Seeds] 알림 생성 중..."

fan_user      = User.find_by!(email: "fan#{SEED_DOMAIN}")
mecha_creator = CreatorUser.find_by!(user: User.find_by!(email: "mecha#{SEED_DOMAIN}"))
luna_creator  = CreatorUser.find_by!(user: User.find_by!(email: "luna#{SEED_DOMAIN}"))
neo_creator   = CreatorUser.find_by!(user: User.find_by!(email: "neo#{SEED_DOMAIN}"))
rina_creator  = CreatorUser.find_by!(user: User.find_by!(email: "rina#{SEED_DOMAIN}"))
noel_creator  = CreatorUser.find_by!(user: User.find_by!(email: "noel#{SEED_DOMAIN}"))

luna_new_post  = Post.find_by(title_ko: "첫 오리지널 곡 발매!", creator_user: luna_creator)
neo_new_post   = Post.find_by(title_ko: "팬 Q&A 모집중", creator_user: neo_creator)
rina_new_post  = Post.find_by(title_ko: "활동 근황 + 다음 작품 예고", creator_user: rina_creator)
noel_new_post  = Post.find_by(title_ko: "마이크 업그레이드! 음질 테스트", creator_user: noel_creator)
liked_post     = Post.find_by(title_ko: "잠 못 드는 밤 — 3시간 ASMR")
commented_post = Post.find_by(title_ko: "루나의 첫 등장 1화 — 보이스드라마")

notifs = [
  { type: "new_post",       title: "새 작품",    body: "Hailey Luna 님이 새 작품을 올렸습니다.",    notifiable: luna_new_post,  age: 1,   read: false },
  { type: "new_post",       title: "새 작품",    body: "NeoVoice 님이 새 작품을 올렸습니다.",       notifiable: neo_new_post,   age: 2,   read: false },
  { type: "new_post",       title: "새 작품",    body: "RINA 님이 새 작품을 올렸습니다.",           notifiable: rina_new_post,  age: 5,   read: false },
  { type: "new_post",       title: "새 작품",    body: "Noel ASMR 님이 새 작품을 올렸습니다.",      notifiable: noel_new_post,  age: 8,   read: false },
  { type: "new_follower",   title: "새 팔로워",  body: "NeoVoice 님이 팔로우했습니다.",             notifiable: neo_creator,    age: 12,  read: false },
  { type: "post_liked",     title: "좋아요",     body: "내 포스트에 좋아요가 달렸습니다.",          notifiable: liked_post,     age: 24,  read: true  },
  { type: "post_commented", title: "새 댓글",    body: "내 포스트에 댓글이 달렸습니다.",            notifiable: commented_post, age: 36,  read: true  },
  { type: "new_follower",   title: "새 팔로워",  body: "RINA 님이 팔로우했습니다.",                 notifiable: rina_creator,   age: 48,  read: true  },
  { type: "new_post",       title: "새 작품",    body: "メチャ公式 님이 새 작품을 올렸습니다.",      notifiable: mecha_creator,  age: 72,  read: true  },
  { type: "post_liked",     title: "좋아요",     body: "루나의 첫 등장이 화제예요!",                notifiable: rina_new_post,  age: 120, read: true  },
]

notifs.each do |attrs|
  next unless attrs[:notifiable].present?
  Notification.find_or_create_by!(user: fan_user, notification_type: attrs[:type], body: attrs[:body]) do |n|
    n.title      = attrs[:title]
    n.notifiable = attrs[:notifiable]
    n.read_at    = attrs[:read] ? attrs[:age].hours.ago : nil
    n.created_at = attrs[:age].hours.ago
    n.updated_at = attrs[:age].hours.ago
  end
end

puts "[Seeds] 알림 #{Notification.where(user: fan_user).count}개 완료"
