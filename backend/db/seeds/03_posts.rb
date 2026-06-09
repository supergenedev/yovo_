puts "[Seeds] 포스트 생성 중..."

SEED_FILES = Rails.root.join("db/seed_files")

mecha_creator = CreatorUser.find_by!(user: User.find_by!(email: "mecha#{SEED_DOMAIN}"))
luna_creator  = CreatorUser.find_by!(user: User.find_by!(email: "luna#{SEED_DOMAIN}"))
neo_creator   = CreatorUser.find_by!(user: User.find_by!(email: "neo#{SEED_DOMAIN}"))
koda_creator  = CreatorUser.find_by!(user: User.find_by!(email: "koda#{SEED_DOMAIN}"))

# ── メチャ 영상 포스트 ────────────────────────────────────────────
[
  {
    title_ko: "메챠 데모 영상 1화 (상편)",
    title_ja: "メチャデモ映像 第1話（前編）",
    body_ko: "メチャスタジオの最初のデモ映像です。前編をお楽しみください。",
    body_ja: "メチャスタジオの最初のデモ映像です。前編をお楽しみください。",
    file: "mecha_ep1_part1.mp4",
    pinned: true,
  },
  {
    title_ko: "메챠 데모 영상 1화 (하편)",
    title_ja: "メチャデモ映像 第1話（後編）",
    body_ko: "1화 하편입니다. 끝까지 봐주세요!",
    body_ja: "第1話の後編です。最後までお楽しみください！",
    file: "mecha_ep1_part2.mp4",
    pinned: false,
  },
].each do |data|
  post = Post.find_or_initialize_by(title_ko: data[:title_ko], creator_user: mecha_creator)

  if post.new_record?
    post.assign_attributes(
      title_ja:      data[:title_ja],
      body_ko:       data[:body_ko],
      body_ja:       data[:body_ja],
      content_type:  :episode,
      view_type:     :buyer_only,
      status:        :published,
      content_price: 100,
      pinned_at:     data[:pinned] ? Time.current : nil,
    )
    post.save!
  end

  next if post.media.attached?

  video_path = SEED_FILES.join(data[:file])
  if video_path.exist?
    post.media.attach(io: File.open(video_path), filename: data[:file], content_type: "video/mp4")
    puts "  → #{data[:title_ko]} 영상 첨부 완료"
  else
    puts "  ⚠ 영상 파일 없음: #{video_path}"
  end
end

# メチャ 무료 텍스트 포스트
[
  {
    title_ko: "YOVO에 오신 것을 환영합니다!",
    title_ja: "YOVOへようこそ！",
    body_ko:  "メチャスタジオの公式YOVOアカウントです。これからよろしくお願いします！",
    body_ja:  "メチャスタジオの公式YOVOアカウントです。これからよろしくお願いします！",
  },
  {
    title_ko: "1화 제작 비하인드",
    title_ja: "第1話制作の裏側",
    body_ko:  "이번 1화를 만들면서 있었던 이야기를 공유합니다. 제작 기간 3개월, 정말 힘들었지만 완성했습니다!",
    body_ja:  "今回の第1話を制作する上でのエピソードをシェアします。",
  },
].each do |data|
  next if Post.exists?(title_ko: data[:title_ko], creator_user: mecha_creator)
  Post.create!(
    creator_user: mecha_creator,
    title_ko: data[:title_ko], title_ja: data[:title_ja],
    body_ko: data[:body_ko], body_ja: data[:body_ja],
    content_type: :text, view_type: :everyone,
    status: :published, content_price: 0
  )
end

# ── Hailey Luna ───────────────────────────────────────────────────
[
  ["새 커버곡 올렸어요 🎵", "新しいカバー曲をアップしました🎵",
   "이번엔 요아소비 커버예요. 열심히 연습했습니다!", "今回はYOASOBIのカバーです。"],
  ["오늘의 연습 일기", "今日の練習日記",
   "목이 조금 아프지만 열심히 했어요 😅", "少し喉が痛いけど頑張りました😅"],
  ["팬 여러분께", "ファンの皆さんへ",
   "항상 응원해주셔서 감사해요. 덕분에 힘이 납니다!", "いつも応援ありがとうございます！"],
].each do |(tko, tja, bko, bja)|
  next if Post.exists?(title_ko: tko, creator_user: luna_creator)
  Post.create!(
    creator_user: luna_creator,
    title_ko: tko, title_ja: tja, body_ko: bko, body_ja: bja,
    content_type: :text, view_type: :everyone,
    status: :published, content_price: 0
  )
end

# ── NeoVoice ──────────────────────────────────────────────────────
[
  ["보이스 드라마 1화 공개", "ボイスドラマ第1話公開",
   "짧은 보이스 드라마 첫 편입니다. 들어보세요!", "短いボイスドラマの第1話です。"],
  ["마이크 새로 샀어요", "新しいマイクを買いました",
   "음질이 많이 좋아졌어요. 다음 작품부터 적용됩니다 🎙", "音質がかなり良くなりました🎙"],
].each do |(tko, tja, bko, bja)|
  next if Post.exists?(title_ko: tko, creator_user: neo_creator)
  Post.create!(
    creator_user: neo_creator,
    title_ko: tko, title_ja: tja, body_ko: bko, body_ja: bja,
    content_type: :text, view_type: :everyone,
    status: :published, content_price: 0
  )
end

# ── 코다 (discover 전용 — fan이 팔로우 안 함) ─────────────────────
[
  ["웹툰 1화 올렸습니다", "ウェブトゥーン第1話を公開しました",
   "처음 올리는 웹툰이에요. 많이 봐주세요 🙏", "初めて公開するウェブトゥーンです。"],
  ["캐릭터 디자인 공개", "キャラクターデザイン公開",
   "이번 작품의 주인공 캐릭터 디자인을 공개합니다!", "今回の作品の主人公デザインを公開します！"],
].each do |(tko, tja, bko, bja)|
  next if Post.exists?(title_ko: tko, creator_user: koda_creator)
  Post.create!(
    creator_user: koda_creator,
    title_ko: tko, title_ja: tja, body_ko: bko, body_ja: bja,
    content_type: :text, view_type: :everyone,
    status: :published, content_price: 0
  )
end

puts "[Seeds] 포스트 #{Post.count}개 완료"
