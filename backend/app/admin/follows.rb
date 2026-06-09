ActiveAdmin.register Follow do
  actions :index, :show, :destroy

  index do
    selectable_column
    id_column
    column :user
    column :creator_user
    column :created_at
    actions
  end

  filter :created_at
end
