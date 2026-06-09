SEED_PASSWORD = "Password1!"

puts "[Seeds] 유저 생성 중..."

[
  { email: "fan#{SEED_DOMAIN}",   nickname: "테스트팬"   },
  { email: "mecha#{SEED_DOMAIN}", nickname: "メチャ公式"  },
  { email: "luna#{SEED_DOMAIN}",  nickname: "Hailey Luna" },
  { email: "neo#{SEED_DOMAIN}",   nickname: "NeoVoice"    },
  { email: "koda#{SEED_DOMAIN}",  nickname: "코다 / Koda" },
].each do |attrs|
  User.find_or_create_by!(email: attrs[:email]) do |u|
    u.nickname              = attrs[:nickname]
    u.password              = SEED_PASSWORD
    u.password_confirmation = SEED_PASSWORD
    u.jti                   = SecureRandom.uuid
  end
end

puts "[Seeds] 유저 5명 완료 (fan, mecha, luna, neo, koda)"
