class Api::V1::UsersController < Api::BaseControllerController
  before_action :sign_in?
  skip_before_action :sign_in?, only: [:sign_up,:log_in]

  rescue_from(RailsParam::Param::InvalidParameterError) do |p|
    render json: {message: "#{p.param}, #{p.message}"},status: :bad_request
  end

  rescue_from(ActiveRecord::RecordNotFound) do |e|
    render json: {message: e.message}, status:404
  end

  rescue_from(RongCloud::ResponseError) do |e|
    render json: {code: e.code, message: e.message}, status:500
  end

  def log_in
    email = params[:email]
    password = params[:password]
    @user = User.find_by(email:email)
    if @user.nil? or not @user.valid_password?(password)
      render json: {message: "不存在或密码错误"}, status:401
      return
    end
    sign_out :user
    @user.remember_me = true if params[:remember_me] == "true"
    sign_in(:user, @user)
    render json: @user,serializer: UserSerializer,status: 200
  end

  def sign_up
    param! :name, String, required: true
    param! :email, String, required: true
    param! :password, String, required: true
    param! :password_confirmation, String, required: true

    parameters = ActionController::Parameters.new(params)
    user = User.new parameters.permit(:email,:password,:name,:password_confirmation)
    token = get_rongyun_token
    if token.nil?
      render json: {message: "得到融云token错误"}, status:403
      return
    end
    user.rongyun_token = token
    if user.save
      sign_in(:user,user)
      render json: current_user, serializer: UserSerializer, status: 200
    else
      render json: {message: user.errors.full_messages}, status: 400
    end
  end

  def log_out
    sign_out(:user)
    render json: {message: "登出成功"},status: 200
  end

  def info
    render json: current_user,serializer: UserSerializer,status: 200
  end

  def reset_rongyun_token
    token = get_rongyun_token
    if token.nil?
      render json: {message: "得到融云token错误"}, status:403
      return
    end
    current_user.update_column(:rongyun_token, token)
    render json: current_user,serializer: UserSerializer,status: 200
  end



end
