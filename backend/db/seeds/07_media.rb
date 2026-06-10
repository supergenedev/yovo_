puts "[Seeds] 포스트 미디어 첨부 중..."

require "open-uri"

SEED_ASSET_DIR = Rails.root.join("tmp/seed_assets")
FileUtils.mkdir_p(SEED_ASSET_DIR)

# 외부 샘플 에셋을 tmp에 캐시해 두고 재시드 시 재다운로드를 피한다.
# 네트워크 실패는 경고만 남기고 건너뛴다 (시드 전체를 깨뜨리지 않음).
def seed_asset(url, filename)
  path = SEED_ASSET_DIR.join(filename)
  unless path.exist?
    URI.open(url, read_timeout: 30) { |io| File.binwrite(path, io.read) }
  end
  path
rescue StandardError => e
  warn "  ⚠ 에셋 다운로드 실패 (건너뜀): #{filename} — #{e.message}"
  nil
end

def attach_media(post, path, content_type:)
  return if post.nil? || path.nil? || post.media.attached?
  post.media.attach(
    io: File.open(path),
    filename: path.basename.to_s,
    content_type: content_type,
  )
  puts "  ✔ #{post.title_ko} ← #{path.basename}"
end

video1 = seed_asset("https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4", "bunny_10s.mp4")
video2 = seed_asset("https://test-videos.co.uk/vids/jellyfish/mp4/h264/360/Jellyfish_360_10s_1MB.mp4", "jellyfish_10s.mp4")
video3 = seed_asset("https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4", "sintel_10s.mp4")

img = ->(seed) { seed_asset("https://picsum.photos/seed/#{seed}/800/450", "#{seed}.jpg") }

mecha = CreatorUser.find_by!(nickname: "メチャ公式") rescue nil
koda  = CreatorUser.joins(:user).find_by(users: { email: "koda#{SEED_DOMAIN}" })
luna  = CreatorUser.joins(:user).find_by(users: { email: "luna#{SEED_DOMAIN}" })
lumi  = CreatorUser.joins(:user).find_by(users: { email: "lumi#{SEED_DOMAIN}" })
miko  = CreatorUser.joins(:user).find_by(users: { email: "miko#{SEED_DOMAIN}" })
mecha ||= CreatorUser.joins(:user).find_by(users: { email: "mecha#{SEED_DOMAIN}" })

# ── VIDEO 페이지용 동영상 포스트 (content_type: :video, 전체 공개) ──
video_posts = [
  { creator: lumi,  title: "단편 애니 「토끼의 봄」 풀버전", body: "10초 분량의 짧은 루프 애니메이션입니다. 봄 분위기 가득 담았어요!", video: video1, age: 30 },
  { creator: miko,  title: "수중 시네마틱 — 해파리의 춤", body: "수조 촬영 + 색보정 연습 영상입니다. 잔잔하게 보기 좋아요.", video: video2, age: 20 },
  { creator: luna,  title: "신곡 MV 티저 (10초)", body: "다음 달 공개될 MV의 첫 티저입니다. 본편 기대해주세요!", video: video3, age: 5 },
]

video_posts.each do |vp|
  next if vp[:creator].nil? || vp[:video].nil?
  post = Post.find_or_create_by!(title_ko: vp[:title], creator_user: vp[:creator]) do |p|
    p.title_ja     = vp[:title]
    p.body_ko      = vp[:body]
    p.body_ja      = vp[:body]
    p.content_type = :video
    p.view_type    = :everyone
    p.status       = :published
    p.created_at   = vp[:age].hours.ago
    p.updated_at   = vp[:age].hours.ago
  end
  attach_media(post, vp[:video], content_type: "video/mp4")
end

# ── 기존 에피소드 포스트에 동영상 첨부 ──
{
  "메챠 데모 영상 1화 (상편)" => video1,
  "메챠 데모 영상 1화 (하편)" => video2,
  "보이스 드라마 1화 공개"     => video3,
}.each do |title, video|
  attach_media(Post.find_by(title_ko: title), video, content_type: "video/mp4")
end

# ── 이미지 포스트에 이미지 첨부 ──
{
  "웹툰 1화 올렸습니다"   => img.call("yovo-webtoon1"),
  "캐릭터 디자인 공개"    => img.call("yovo-chara"),
  "웹툰 2화 공개"        => img.call("yovo-webtoon2"),
}.each do |title, image|
  post = Post.find_by(title_ko: title)
  next if post.nil? || image.nil?
  post.update!(content_type: :image) if post.content_text?
  attach_media(post, image, content_type: "image/jpeg")
end

puts "[Seeds] 미디어 첨부 완료 (영상 포스트 #{Post.content_video.count}개, 첨부 #{ActiveStorage::Attachment.count}건)"
