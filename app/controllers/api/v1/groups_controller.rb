class Api::V1::GroupsController < Api::BaseControllerController
  before_action :sign_in?
  rescue_from(RailsParam::Param::InvalidParameterError) do |p|
    render json: {message: "#{p.param}, #{p.message}"},status: :bad_request
  end

  rescue_from(ActiveRecord::RecordNotFound) do |e|
    render json: {message: e.message}, status:404
  end

  rescue_from(RongCloud::ResponseError) do |e|
    render json: {code: e.code, message: e.message}, status:500
  end

  def create
    param! :name, String, required: true
    params[:creater_id] = current_user.id
    parameters = ActionController::Parameters.new(params)
    group = Group.new parameters.permit(:name,:creater_id)
    if group.save
      result = RongCloud::Api.new.groupCreate({userId: group.creater_id,groupId: group.id,groupName: group.name})
      unless result.parsed_response["code"] == 200
        group.destroy
        render json: {message: "创建融云群组失败"}, status: 400
      else
        render json: {message: "创建群组成功"}, status: 200
      end
    else
      render json: {message: "创建群组失败"}, status: 400
    end
  end

end
