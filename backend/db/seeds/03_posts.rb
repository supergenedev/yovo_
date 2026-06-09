puts "[Seeds] 포스트 생성 중..."

def create_post(creator, title_ko:, title_ja: nil, body_ko: "", body_ja: nil, content_type: :text, view_type: :everyone, price: 0, pinned: false, age: 0)
  return if Post.exists?(title_ko: title_ko, creator_user: creator)
  Post.create!(
    creator_user:  creator,
    title_ko:      title_ko,
    title_ja:      title_ja || title_ko,
    body_ko:       body_ko,
    body_ja:       body_ja || body_ko,
    content_type:  content_type,
    view_type:     view_type,
    status:        :published,
    content_price: price,
    pinned_at:     pinned ? Time.current : nil,
    created_at:    age.hours.ago,
    updated_at:    age.hours.ago,
  )
end

mecha = CreatorUser.find_by!(user: User.find_by!(email: "mecha#{SEED_DOMAIN}"))
luna  = CreatorUser.find_by!(user: User.find_by!(email: "luna#{SEED_DOMAIN}"))
neo   = CreatorUser.find_by!(user: User.find_by!(email: "neo#{SEED_DOMAIN}"))
koda  = CreatorUser.find_by!(user: User.find_by!(email: "koda#{SEED_DOMAIN}"))
rina  = CreatorUser.find_by!(user: User.find_by!(email: "rina#{SEED_DOMAIN}"))
saya  = CreatorUser.find_by!(user: User.find_by!(email: "saya#{SEED_DOMAIN}"))
miko  = CreatorUser.find_by!(user: User.find_by!(email: "miko#{SEED_DOMAIN}"))
noel  = CreatorUser.find_by!(user: User.find_by!(email: "noel#{SEED_DOMAIN}"))
lumi  = CreatorUser.find_by!(user: User.find_by!(email: "lumi#{SEED_DOMAIN}"))

# ── メチャ ───────────────────────────────────────────────────────
create_post(mecha, title_ko: "YOVO에 오신 것을 환영합니다!", body_ko: "メチャスタジオの公式YOVOアカウントです。これからよろしくお願いします！", pinned: true, age: 720)
create_post(mecha, title_ko: "메챠 데모 영상 1화 (상편)", body_ko: "스튜디오 최초 데모 영상 상편입니다. 제작기간 3개월, 정말 힘들었지만 완성했습니다!", content_type: :episode, view_type: :buyer_only, price: 100, age: 480)
create_post(mecha, title_ko: "메챠 데모 영상 1화 (하편)", body_ko: "1화 하편입니다. 끝까지 봐주세요!", content_type: :episode, view_type: :buyer_only, price: 100, age: 460)
create_post(mecha, title_ko: "1화 제작 비하인드", body_ko: "이번 1화를 만들면서 있었던 이야기를 공유합니다. 배경음악 선정부터 성우 캐스팅까지 모든 과정이 쉽지 않았어요.", age: 200)
create_post(mecha, title_ko: "시즌 2 티저 공개!", body_ko: "드디어 시즌 2 제작에 들어갑니다. 기대해주세요!", age: 12)

# ── Hailey Luna ───────────────────────────────────────────────────
create_post(luna, title_ko: "새 커버곡 올렸어요", body_ko: "이번엔 요아소비 커버예요. 열심히 연습했습니다! 많이 들어주세요.", age: 300)
create_post(luna, title_ko: "오늘의 연습 일기", body_ko: "목이 조금 아프지만 열심히 했어요. 다음 업로드도 기대해주세요!", age: 168)
create_post(luna, title_ko: "팬 여러분께", body_ko: "항상 응원해주셔서 감사해요. 덕분에 힘이 납니다! 앞으로도 잘 부탁드려요.", age: 72)
create_post(luna, title_ko: "첫 오리지널 곡 발매!", body_ko: "드디어 첫 오리지널 곡을 발매했습니다. 많은 관심 부탁드려요.", content_type: :episode, view_type: :everyone, age: 6)

# ── NeoVoice ──────────────────────────────────────────────────────
create_post(neo, title_ko: "보이스 드라마 1화 공개", body_ko: "짧은 보이스 드라마 첫 편입니다. 헤드폰으로 들으시면 더 좋아요!", content_type: :episode, view_type: :everyone, age: 400)
create_post(neo, title_ko: "마이크 새로 샀어요", body_ko: "음질이 많이 좋아졌어요. 다음 작품부터 적용됩니다.", age: 200)
create_post(neo, title_ko: "보이스 드라마 2화 공개", body_ko: "2화입니다. 이번엔 더 감정 실어서 녹음했어요. 잘 봐주세요!", content_type: :episode, view_type: :buyer_only, price: 80, age: 48)
create_post(neo, title_ko: "팬 Q&A 모집중", body_ko: "다음 주 팬 Q&A를 진행할 예정입니다. 궁금한 것 댓글로 남겨주세요!", age: 3)

# ── 코다 ──────────────────────────────────────────────────────────
create_post(koda, title_ko: "웹툰 1화 올렸습니다", body_ko: "처음 올리는 웹툰이에요. 많이 봐주세요.", age: 500)
create_post(koda, title_ko: "캐릭터 디자인 공개", body_ko: "이번 작품의 주인공 캐릭터 디자인을 공개합니다!", age: 300)
create_post(koda, title_ko: "웹툰 2화 공개", body_ko: "2화입니다! 이번에는 주인공이 첫 시련을 겪어요.", age: 100)

# ── RINA ──────────────────────────────────────────────────────────
create_post(rina, title_ko: "루나의 첫 등장 1화 — 보이스드라마", body_ko: "오랫동안 준비했던 보이스 드라마 시리즈 첫 화를 공개합니다. 감성적인 이야기, 놓치지 마세요.", content_type: :episode, view_type: :everyone, age: 360)
create_post(rina, title_ko: "루나의 첫 등장 2화 — 만남", body_ko: "2화입니다. 두 사람의 운명적인 만남이 시작됩니다.", content_type: :episode, view_type: :buyer_only, price: 120, age: 180)
create_post(rina, title_ko: "롤플레이 단편 — 비 오는 날", body_ko: "비 오는 날의 분위기를 담은 단편 롤플레이입니다. 이어폰 착용을 추천드려요.", content_type: :episode, view_type: :buyer_only, price: 90, age: 48)
create_post(rina, title_ko: "활동 근황 + 다음 작품 예고", body_ko: "요즘 녹음 스케줄이 빡빡하지만 열심히 하고 있어요! 다음 달에 새 시리즈 시작합니다.", age: 8)

# ── 사야 SAYA ──────────────────────────────────────────────────────
create_post(saya, title_ko: "첫 싱글 〈봄비〉 발매", body_ko: "드디어 첫 싱글을 발매했습니다. 많은 관심 부탁드려요. 뮤직비디오도 준비 중입니다!", content_type: :episode, view_type: :everyone, age: 500)
create_post(saya, title_ko: "커버곡 — 비틀즈 Yesterday", body_ko: "비틀즈의 Yesterday를 한국어 버전으로 커버했습니다.", content_type: :episode, view_type: :everyone, age: 240)
create_post(saya, title_ko: "풀앨범 제작 일지 1", body_ko: "드디어 풀앨범 작업에 들어갔습니다. 총 10곡 목표로 진행 중이에요.", age: 96)
create_post(saya, title_ko: "라이브 녹화 영상 공개", body_ko: "지난 달 소규모 라이브 공연 영상을 공개합니다.", content_type: :episode, view_type: :buyer_only, price: 50, age: 24)

# ── MIKO Studio ────────────────────────────────────────────────────
create_post(miko, title_ko: "단편 시네마틱 〈달이 지는 도시〉 공개", body_ko: "MIKO Studio의 첫 번째 시네마틱 단편입니다. 도시의 고독과 연대를 담았습니다.", content_type: :video, view_type: :buyer_only, price: 200, age: 600)
create_post(miko, title_ko: "제작 노트 — 조명 설계", body_ko: "이번 작품에서 가장 공들인 부분은 조명이었어요. 자연광과 인공광의 조화를 고민했습니다.", age: 480)
create_post(miko, title_ko: "단편 시리즈 2편 〈새벽이 떠오를 때〉", body_ko: "2편입니다. 이번에는 2인 콜라보로 제작했어요. 코다 / Koda와 함께했습니다.", content_type: :video, view_type: :buyer_only, price: 200, age: 240)
create_post(miko, title_ko: "3편 제작 발표 + 캐스팅 모집", body_ko: "3편 제작을 발표합니다! 성우 캐스팅을 진행 중이에요. 지원 링크는 프로필에.", age: 12)

# ── Noel ASMR ──────────────────────────────────────────────────────
create_post(noel, title_ko: "잠 못 드는 밤 — 3시간 ASMR", body_ko: "잠 못 드는 밤, 옆에서 다정히 속삭여 드릴게요. 헤드폰 사용을 권장합니다. 챕터별로 분리되어 있어 원하는 부분부터 들을 수 있어요.", content_type: :episode, view_type: :buyer_only, price: 150, age: 400)
create_post(noel, title_ko: "빗소리 ASMR — 수면 유도", body_ko: "빗소리와 함께하는 수면 유도 ASMR입니다. 90분 풀버전.", content_type: :episode, view_type: :everyone, age: 200)
create_post(noel, title_ko: "새벽 3시의 속삭임 — 롤플레이", body_ko: "새벽 3시, 잠이 안 오는 당신에게. 가상 시나리오 롤플레이입니다.", content_type: :episode, view_type: :buyer_only, price: 130, age: 72)
create_post(noel, title_ko: "마이크 업그레이드! 음질 테스트", body_ko: "새 마이크를 장만했어요. 음질이 확 달라졌습니다. 들어보시고 의견 남겨주세요!", age: 6)

# ── Lumi Anime ──────────────────────────────────────────────────────
create_post(lumi, title_ko: "단편 애니메이션 〈빛의 조각〉 공개", body_ko: "1년간 혼자 제작한 3분짜리 단편 애니메이션입니다. 많이 봐주세요.", content_type: :video, view_type: :everyone, age: 700)
create_post(lumi, title_ko: "제작기 — 프레임 작업", body_ko: "총 2,400프레임을 손으로 그렸습니다. 힘들었지만 보람 있었어요!", age: 600)
create_post(lumi, title_ko: "신작 〈달과 소녀〉 티저", body_ko: "다음 작품 티저를 공개합니다. 이번엔 좀 더 어두운 분위기예요.", content_type: :video, view_type: :buyer_only, price: 100, age: 120)

# ── 좋아요 / 북마크 (fan 유저) ────────────────────────────────────
fan = User.find_by!(email: "fan#{SEED_DOMAIN}")

liked_titles = [
  "YOVO에 오신 것을 환영합니다!",
  "새 커버곡 올렸어요",
  "루나의 첫 등장 1화 — 보이스드라마",
  "잠 못 드는 밤 — 3시간 ASMR",
  "보이스 드라마 1화 공개",
  "단편 시네마틱 〈달이 지는 도시〉 공개",
]
liked_titles.each do |title|
  post = Post.find_by(title_ko: title)
  next unless post
  PostLike.find_or_create_by!(user: fan, post: post)
end

bookmarked_titles = [
  "잠 못 드는 밤 — 3시간 ASMR",
  "루나의 첫 등장 1화 — 보이스드라마",
  "단편 시네마틱 〈달이 지는 도시〉 공개",
]
bookmarked_titles.each do |title|
  post = Post.find_by(title_ko: title)
  next unless post
  Bookmark.find_or_create_by!(user: fan, post: post)
end

# ── 댓글 ─────────────────────────────────────────────────────────
[
  { post_title: "잠 못 드는 밤 — 3시간 ASMR",        text: "헤드폰으로 들었는데 진짜 옆에 있는 것 같아서 깜짝 놀랐어요. 너무 좋아요!" },
  { post_title: "루나의 첫 등장 1화 — 보이스드라마",   text: "목소리가 정말 매력적이에요! 2화도 빨리 올려주세요." },
  { post_title: "새 커버곡 올렸어요",                  text: "요아소비 좋아하는데 이 커버 완전 취향이에요!" },
  { post_title: "보이스 드라마 1화 공개",              text: "퀄리티가 너무 좋아요. 계속 들을 것 같아요." },
].each do |data|
  post = Post.find_by(title_ko: data[:post_title])
  next unless post
  next if PostComment.exists?(commenter: fan, post: post)
  PostComment.create!(commenter: fan, post: post, text: data[:text])
end

# ── 채팅방 ────────────────────────────────────────────────────────
mecha_creator = CreatorUser.find_by!(user: User.find_by!(email: "mecha#{SEED_DOMAIN}"))
rina_creator  = CreatorUser.find_by!(user: User.find_by!(email: "rina#{SEED_DOMAIN}"))

[mecha_creator, rina_creator].each do |creator|
  room = ChatRoom.find_or_create_by!(user: fan, creator_user: creator)
  next if room.chats.exists?
  Chat.create!(chat_room: room, sender: fan, message: "안녕하세요! 팬입니다.", content_type: :text, message_type: :fan)
  Chat.create!(chat_room: room, sender: creator.user, message: "안녕하세요! 응원 감사합니다.", content_type: :text, message_type: :creator)
end

puts "[Seeds] 포스트 #{Post.count}개 / 좋아요 #{PostLike.count}개 / 북마크 #{Bookmark.count}개 / 댓글 #{PostComment.count}개 완료"
