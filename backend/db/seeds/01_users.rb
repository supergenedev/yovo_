SEED_PASSWORD = "Password1!"

puts "[Seeds] 유저 생성 중..."

[
  { email: "fan#{SEED_DOMAIN}",   nickname: "테스트팬"    },
  { email: "mecha#{SEED_DOMAIN}", nickname: "メチャ公式"   },
  { email: "luna#{SEED_DOMAIN}",  nickname: "Hailey Luna" },
  { email: "neo#{SEED_DOMAIN}",   nickname: "NeoVoice"    },
  { email: "koda#{SEED_DOMAIN}",  nickname: "코다 / Koda" },
  { email: "rina#{SEED_DOMAIN}",  nickname: "RINA"        },
  { email: "saya#{SEED_DOMAIN}",  nickname: "사야 SAYA"   },
  { email: "miko#{SEED_DOMAIN}",  nickname: "MIKO Studio" },
  { email: "noel#{SEED_DOMAIN}",  nickname: "Noel ASMR"   },
  { email: "lumi#{SEED_DOMAIN}",  nickname: "Lumi Anime"  },
].each do |attrs|
  User.find_or_create_by!(email: attrs[:email]) do |u|
    u.nickname              = attrs[:nickname]
    u.password              = SEED_PASSWORD
    u.password_confirmation = SEED_PASSWORD
    u.jti                   = SecureRandom.uuid
  end
end

puts "[Seeds] 유저 10명 완료"
