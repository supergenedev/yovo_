namespace :seed do
  seed_domain = "@seed.yovo.dev"

  desc "시드 데이터 전체 삭제 (#{seed_domain} 유저 및 연관 데이터)"
  task clear: :environment do
    seed_users = User.with_deleted.where("email LIKE ?", "%#{seed_domain}")

    if seed_users.empty?
      puts "삭제할 시드 데이터가 없습니다."
      next
    end

    puts "시드 데이터 삭제 중... (#{seed_users.count}명)"

    seed_users.each do |user|
      # CreatorUser 연관 데이터
      if (creator = user.creator_user)
        creator.posts.each { |p| p.media.purge }
        creator.really_destroy!
      end
      user.really_destroy!
    end

    puts "✅ 시드 데이터 삭제 완료"
  end
end
