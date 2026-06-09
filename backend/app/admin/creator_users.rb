ActiveAdmin.register CreatorUser do
  permit_params :nickname, :username, :description_ko, :tags

  index do
    selectable_column
    id_column
    column :nickname
    column :username
    column :followers_count
    column :created_at
    actions
  end

  filter :nickname
  filter :created_at
end
