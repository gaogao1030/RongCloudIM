class AddNameAndRongyunTokenToUsers < ActiveRecord::Migration
  def change
    add_column :users, :name,:string
    add_column :users, :rongyun_token,:string
  end

end
