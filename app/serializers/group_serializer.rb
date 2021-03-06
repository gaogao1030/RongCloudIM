class GroupSerializer < ActiveModel::Serializer
  class MemberSerializer < ActiveModel::Serializer
    attributes :id,:email,:name,:avatar
  end
  attributes :id,:name,:creater_id
  has_many :members, serializer: MemberSerializer
end
