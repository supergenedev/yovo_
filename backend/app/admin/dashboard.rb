# frozen_string_literal: true
ActiveAdmin.register_page "Dashboard" do
  menu priority: 1, label: proc { I18n.t("active_admin.dashboard") }

  content title: proc { I18n.t("active_admin.dashboard") } do
    columns do
      column do
        panel "통계" do
          para "유저: #{User.count}명"
          para "크리에이터: #{CreatorUser.count}명"
          para "포스트: #{Post.count}개"
          para "댓글: #{PostComment.count}개"
          para "팔로우: #{Follow.count}개"
        end
      end
      column do
        panel "최근 가입 유저" do
          table_for User.order(created_at: :desc).limit(5) do
            column :email
            column :nickname
            column :created_at
          end
        end
      end
    end
  end
end
