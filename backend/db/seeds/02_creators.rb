puts "[Seeds] 크리에이터 생성 중..."

mecha_user  = User.find_by!(email: "mecha#{SEED_DOMAIN}")
luna_user   = User.find_by!(email: "luna#{SEED_DOMAIN}")
neo_user    = User.find_by!(email: "neo#{SEED_DOMAIN}")
koda_user   = User.find_by!(email: "koda#{SEED_DOMAIN}")

mecha_creator = CreatorUser.find_or_create_by!(user: mecha_user) do |c|
  c.nickname     = "メチャ公式"
  c.introduction = "メチャスタジオ公式アカウント。アニメ・ストーリーコンテンツを発信中。"
  c.creator_type = :official
  c.status       = :active
end

luna_creator = CreatorUser.find_or_create_by!(user: luna_user) do |c|
  c.nickname     = "Hailey Luna"
  c.introduction = "J-POP / 커버곡을 주로 올립니다. 팬 여러분 감사해요 🎵"
  c.creator_type = :basic
  c.status       = :active
end

neo_creator = CreatorUser.find_or_create_by!(user: neo_user) do |c|
  c.nickname     = "NeoVoice"
  c.introduction = "보이스 드라마·낭독 전문 크리에이터입니다."
  c.creator_type = :basic
  c.status       = :active
end

koda_creator = CreatorUser.find_or_create_by!(user: koda_user) do |c|
  c.nickname     = "코다 / Koda"
  c.introduction = "웹툰·일러스트 작가. 매주 목요일 업로드."
  c.creator_type = :basic
  c.status       = :active
end

# 태그
{
  mecha_creator => %w[애니메이션 공식 스토리],
  luna_creator  => %w[음악 J-POP 커버],
  neo_creator   => %w[보이스드라마 낭독 오디오],
  koda_creator  => %w[웹툰 일러스트 아트],
}.each do |creator, tags|
  tags.each { |name| creator.creator_tags.find_or_create_by!(name:) }
end

puts "[Seeds] 크리에이터 4명 + 태그 완료"
