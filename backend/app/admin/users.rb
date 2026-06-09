ActiveAdmin.register User do
  permit_params :email, :nickname, :username

  index do
    selectable_column
    id_column
    column :email
    column :nickname
    column :username
    column :created_at
    actions
  end

  filter :email
  filter :nickname
  filter :created_at

  show do
    attributes_table do
      row :id
      row :email
      row :nickname
      row :username
      row :created_at
      row :updated_at
    end
  end

  form do |f|
    f.inputs do
      f.input :email
      f.input :nickname
      f.input :username
    end
    f.actions
  end
end
