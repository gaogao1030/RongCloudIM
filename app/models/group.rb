# == Schema Information
#
# Table name: groups
#
#  id         :integer          not null, primary key
#  creater_id :string(255)
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  avatar     :string(255)
#

class Group < ActiveRecord::Base
  has_many :user_groups,dependent: :destroy
  has_many :members, through: :user_groups, source: :user

  def include_user?(user_id)
    ids = self.members.map{|u|u.id}
    ids.include? user_id
  end

  def add_user(opt={})
    ug=self.user_groups.build(opt)
    ug.save
  end

  def remove_user(user_id)
    ug = self.user_groups.find_by(user_id: user_id)
    ug.delete
  end

end
