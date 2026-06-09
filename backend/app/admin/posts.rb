ActiveAdmin.register Post do
  permit_params :title_ko, :body_ko, :view_type, :status, :content_type

  index do
    selectable_column
    id_column
    column :title_ko
    column :view_type
    column :status
    column :likes_count
    column :comments_count
    column(:creator) { |p| p.creator_user&.nickname }
    column :created_at
    actions
  end

  filter :title_ko
  filter :view_type
  filter :status
  filter :created_at

  show do
    attributes_table do
      row :id
      row :title_ko
      row :body_ko
      row :view_type
      row :status
      row :content_type
      row :likes_count
      row :comments_count
      row :created_at
    end
  end
end
