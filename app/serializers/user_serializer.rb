class UserSerializer < ActiveModel::Serializer
  attributes :id,:email,:name,:rongyun_token,:rongyun_app_key
  has_many :groups

end
