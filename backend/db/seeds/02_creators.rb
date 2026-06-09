puts "[Seeds] 크리에이터 생성 중..."

mecha_user = User.find_by!(email: "mecha#{SEED_DOMAIN}")
luna_user  = User.find_by!(email: "luna#{SEED_DOMAIN}")
neo_user   = User.find_by!(email: "neo#{SEED_DOMAIN}")
koda_user  = User.find_by!(email: "koda#{SEED_DOMAIN}")
rina_user  = User.find_by!(email: "rina#{SEED_DOMAIN}")
saya_user  = User.find_by!(email: "saya#{SEED_DOMAIN}")
miko_user  = User.find_by!(email: "miko#{SEED_DOMAIN}")
noel_user  = User.find_by!(email: "noel#{SEED_DOMAIN}")
lumi_user  = User.find_by!(email: "lumi#{SEED_DOMAIN}")

mecha_creator = CreatorUser.find_or_create_by!(user: mecha_user) do |c|
  c.nickname         = "メチャ公式"
  c.introduction     = "メチャスタジオ公式アカウント。アニメ・ストーリーコンテンツを発信中。"
  c.creator_type     = :official
  c.status           = :active
  c.background_color = "linear-gradient(135deg,#0c1429,#4c1d95)"
end

luna_creator = CreatorUser.find_or_create_by!(user: luna_user) do |c|
  c.nickname         = "Hailey Luna"
  c.introduction     = "J-POP / 커버곡을 주로 올립니다. 팬 여러분 감사해요!"
  c.creator_type     = :basic
  c.status           = :active
  c.background_color = "linear-gradient(135deg,#1e1b4b,#be185d)"
end

neo_creator = CreatorUser.find_or_create_by!(user: neo_user) do |c|
  c.nickname         = "NeoVoice"
  c.introduction     = "보이스 드라마·낭독 전문 크리에이터입니다."
  c.creator_type     = :basic
  c.status           = :active
  c.background_color = "linear-gradient(135deg,#042f2e,#0f766e)"
end

koda_creator = CreatorUser.find_or_create_by!(user: koda_user) do |c|
  c.nickname         = "코다 / Koda"
  c.introduction     = "웹툰·일러스트 작가. 매주 목요일 업로드."
  c.creator_type     = :basic
  c.status           = :active
  c.background_color = "linear-gradient(135deg,#431407,#c2410c)"
end

rina_creator = CreatorUser.find_or_create_by!(user: rina_user) do |c|
  c.nickname         = "RINA"
  c.introduction     = "당신의 밤을 채우는 보이스 드라마. 감성 낭독과 롤플레이 전문."
  c.creator_type     = :basic
  c.status           = :active
  c.background_color = "linear-gradient(135deg,#4a044e,#be185d)"
end

saya_creator = CreatorUser.find_or_create_by!(user: saya_user) do |c|
  c.nickname         = "사야 SAYA"
  c.introduction     = "보컬리스트. 첫 풀앨범 제작 중. 응원해주세요!"
  c.creator_type     = :basic
  c.status           = :active
  c.background_color = "linear-gradient(135deg,#0c4a6e,#0ea5e9)"
end

miko_creator = CreatorUser.find_or_create_by!(user: miko_user) do |c|
  c.nickname         = "MIKO Studio"
  c.introduction     = "단편영화 전문 스튜디오. 시네마틱 단편 시리즈 제작 중."
  c.creator_type     = :official
  c.status           = :active
  c.background_color = "linear-gradient(135deg,#1c1917,#57534e)"
end

noel_creator = CreatorUser.find_or_create_by!(user: noel_user) do |c|
  c.nickname         = "Noel ASMR"
  c.introduction     = "잠 못 드는 밤, 곁에서 속삭여 드릴게요. 헤드폰 필수 권장."
  c.creator_type     = :basic
  c.status           = :active
  c.background_color = "linear-gradient(135deg,#0f172a,#1e3a5f)"
end

lumi_creator = CreatorUser.find_or_create_by!(user: lumi_user) do |c|
  c.nickname         = "Lumi Anime"
  c.introduction     = "독립 애니메이션 단편 제작자. 빛과 색으로 이야기합니다."
  c.creator_type     = :basic
  c.status           = :active
  c.background_color = "linear-gradient(135deg,#fdf4ff,#a21caf)"
end

{
  mecha_creator => %w[애니메이션 공식 스토리],
  luna_creator  => %w[음악 J-POP 커버],
  neo_creator   => %w[보이스드라마 낭독 오디오],
  koda_creator  => %w[웹툰 일러스트 아트],
  rina_creator  => %w[보이스드라마 롤플레이 감성],
  saya_creator  => %w[음악 보컬 싱어송라이터],
  miko_creator  => %w[시네마틱 단편영화 영상],
  noel_creator  => %w[ASMR 수면 힐링],
  lumi_creator  => %w[애니메이션 일러스트 단편],
}.each do |creator, tags|
  tags.each { |name| creator.creator_tags.find_or_create_by!(name:) }
end

puts "[Seeds] 크리에이터 9명 + 태그 완료"
