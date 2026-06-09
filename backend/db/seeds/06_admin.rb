AdminUser.find_or_create_by!(email: 'admin@yovo.dev') do |admin|
  admin.password = 'Admin123!'
  admin.password_confirmation = 'Admin123!'
end
puts "AdminUser created: admin@yovo.dev / Admin123!"
