puts "[Seeds] 프로필 이미지 첨부 중..."

# seed_asset 헬퍼는 07_media.rb에서 정의됨 (tmp 캐시 + 실패 시 건너뜀)

def attach_profile(record, path)
  return if record.nil? || path.nil? || record.profile_image.attached?
  record.profile_image.attach(
    io: File.open(path),
    filename: path.basename.to_s,
    content_type: "image/jpeg",
  )
  name = record.respond_to?(:nickname) ? record.nickname : record.email
  puts "  ✔ #{name} ← #{path.basename}"
end

# 크리에이터별 고정 인물 아바타 (pravatar img 번호 고정 → 재시드해도 동일)
CreatorUser.order(:id).each_with_index do |creator, i|
  img_no = (i * 7 + 11) % 70 + 1 # 1~70 분산
  attach_profile(creator, seed_asset("https://i.pravatar.cc/300?img=#{img_no}", "avatar-creator-#{img_no}.jpg"))
end

# 일반 유저(팬 등)도 아바타 부여
User.order(:id).each_with_index do |user, i|
  img_no = (i * 5 + 3) % 70 + 1
  attach_profile(user, seed_asset("https://i.pravatar.cc/300?img=#{img_no}", "avatar-user-#{img_no}.jpg"))
end

puts "[Seeds] 프로필 이미지 완료 (크리에이터 #{CreatorUser.all.count { |c| c.profile_image.attached? }}/#{CreatorUser.count}, 유저 #{User.all.count { |u| u.profile_image.attached? }}/#{User.count})"
