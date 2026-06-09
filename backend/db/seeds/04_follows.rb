puts "[Seeds] 팔로우 관계 설정 중..."

fan_user = User.find_by!(email: "fan#{SEED_DOMAIN}")

# fan이 팔로우하는 크리에이터 (6명)
follow_emails = %w[mecha luna neo rina saya noel]
follow_emails.each do |name|
  creator = CreatorUser.find_by!(user: User.find_by!(email: "#{name}#{SEED_DOMAIN}"))
  Follow.find_or_create_by!(user: fan_user, creator_user: creator)
end

# koda, miko, lumi는 팔로우 안 함 → discover 피드에서 노출

puts "[Seeds] fan → #{follow_emails.join(', ')} 팔로우 완료 (koda/miko/lumi는 discover용)"
