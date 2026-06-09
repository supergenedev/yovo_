ActiveAdmin.register Notification do
  actions :index, :show

  index do
    selectable_column
    id_column
    column :user
    column :notification_type
    column :read_at
    column :created_at
    actions
  end

  filter :notification_type
  filter :read_at
  filter :created_at
end
