puts "[Seeds] 팔로우 관계 설정 중..."

fan_user      = User.find_by!(email: "fan#{SEED_DOMAIN}")
mecha_creator = CreatorUser.find_by!(user: User.find_by!(email: "mecha#{SEED_DOMAIN}"))
luna_creator  = CreatorUser.find_by!(user: User.find_by!(email: "luna#{SEED_DOMAIN}"))
neo_creator   = CreatorUser.find_by!(user: User.find_by!(email: "neo#{SEED_DOMAIN}"))
# koda는 팔로우하지 않음 → discover 피드에서 노출

[mecha_creator, luna_creator, neo_creator].each do |creator|
  Follow.find_or_create_by!(user: fan_user, creator_user: creator)
end

puts "[Seeds] fan → mecha, luna, neo 팔로우 완료 (koda는 discover용)"
