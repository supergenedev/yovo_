SEED_DOMAIN = "@seed.yovo.dev"

Dir[Rails.root.join("db/seeds/*.rb")].sort.each do |f|
  puts "\n▶ #{File.basename(f)}"
  load f
end

puts "\n✅ 시드 완료"
puts "   삭제: rails seed:clear"
puts "   계정: fan/mecha/luna/neo/koda + #{SEED_DOMAIN} / Password1!"
