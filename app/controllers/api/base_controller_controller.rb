class Api::BaseControllerController < ActionController::API
include ActionController::Serialization

protected
  def get_rongyun_token
    result = RongCloud::Api.new.userGetToken({userId:current_user.id,name:current_user.name,portraitUri:""})
    return result["token"]
  end

  def sign_in?
    if current_user.nil?
      render json: {message: "未登录"}
    end
  end
end
