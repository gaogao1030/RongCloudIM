class AddAvatarToUserAndGroupTable < ActiveRecord::Migration
  def change
    add_column :users, :avatar,:string
    add_column :groups, :avatar,:string
  end
end
