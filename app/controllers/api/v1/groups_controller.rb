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

  def sync
    groups=current_user.groups
    opt = groups.reduce({}){|result,g| result.merge({"group[#{g.id}]"=>g.name})}
    opt = opt.merge({userId: current_user.id})
    result = RongCloud::Api.new.groupSync(opt)
    unless result.parsed_response["code"] == 200
    else
      render json: {message: "融云群组同步成功"}, status: 200
    end
  end

  def list
    @groups = Group.all
    render json: @groups,each_serializer: GroupListSerializer, status: 200
  end

  def my_list
    @groups = current_user.groups
    render json: @groups,each_serializer: GroupListSerializer, status: 200
  end

  def find_list
    ids = current_user.groups.map{|g|g.id}
    @gourps = Group.where.not(id:ids)
    if @groups.nil?
      render json: {message: "没有发现群组"}, status: 404
    else
      render json: @groups,each_serializer: GroupListSerializer, status: 200
    end

  end

  def create
    param! :name, String, required: true
    params[:creater_id] = current_user.id
    parameters = ActionController::Parameters.new(params)
    group = Group.new parameters.permit(:name,:creater_id)
    if !group.save
      render json: {message: "创建群组失败"}, status: 400
      return
    end
    if !group.add_user user_id: current_user.id
      render json: {message: "添加成员失败"}, status: 400
      return
    end
    result = RongCloud::Api.new.groupCreate({userId: group.creater_id,groupId: group.id,groupName: group.name})
    if result.parsed_response["code"] == 200
      render json: {message: "创建融云群组成功"}, status: 200
    end
  end

  def join
    param! :group_id, String, required: true
    group = Group.find_by(id: params[:group_id])
    if group.nil?
      render json: {message: "不存在改群组"}, status: 404
      return
    end
    if group.include_user? current_user.id
      render json: {message: "已经加入该群组"}, status: 200
      return
    end
    if !group.add_user user_id: current_user.id
      render json: {message: "添加成员失败"}, status: 400
      return
    end
    result = RongCloud::Api.new.groupJoin({userId: current_user.id,groupId: group.id,groupName: group.name})
    if result.parsed_response["code"] == 200
      render json: {message: "加入融云群组成功"}, status: 200
    end
  end

  def quit
    param! :group_id, String, required: true
    group = Group.find_by(id: params[:group_id])
    if group.nil?
      render json: {message: "不存在改群组"}, status: 404
      return
    end
    if !group.remove_user(current_user.id)
      render json: {message: "移除成员失败"}, status: 400
      return
    end
    result = RongCloud::Api.new.groupQuit({groupId: group.id,userId: current_user.id})
    if result.parsed_response["code"] == 200
      render json: {message: "退出融云群组成功"}
    end
  end

  def dismiss
    param! :group_id, String, required: true
    group = Group.find_by(id: params[:group_id])
    if group.nil?
      render json: {message: "不存在改群组"}, status: 404
      return
    end
    if current_user.id != group.creater_id
      render json: {message: "你不是创建者,所以无法删除。"},status: 402
    end
    if !group.destroy
      render json: {message: "群组删除失败"},status: 400
      return
    end
    result = RongCloud::Api.new.groupDismiss({groupId: group.id,userId: current_user.id})
    if result.parsed_response["code"] == 200
      render json: {message: "融云群组解散成功"},status: 200
    end
  end

  def info
    param! :group_id, String, required: true
    group = Group.find_by(id: params[:group_id])
    if group.nil?
      render json: {message: "不存在改群组"}, status: 404
      return
    end
    @group = group
    result = RongCloud::Api.new.groupUserQuery({groupId: group.id})
    if result.parsed_response["code"] == 200
      render json: @group,serializer: GroupSerializer,status: 200
    end
  end

  def member_list
    param! :group_id, String, required: true
    group = Group.find_by(id: params[:group_id])
    if group.nil?
      render json: {message: "不存在改群组"}, status: 404
      return
    end
    result = RongCloud::Api.new.groupUserQuery({groupId: group.id})
    if result.parsed_response["code"] == 200
      render json: {members: result.parsed_response["users"]}
    end
  end

  def refresh
    param! :group_id, String, required: true
    group = Group.find_by(id: params[:group_id])
    if group.nil?
      render json: {message: "不存在改群组"}, status: 404
      return
    end
    result = RongCloud::Api.new.groupRefresh({groupId: group.id,groupName: group.name})
    if result.parsed_response["code"] == 200
      render json: {message: "群组刷新成功"}
    end
  end

  def user_gag_add
    param! :user_id, String, required: true
    param! :group_id, String, required: true
    param! :minute, String, default: "60"
    group = Group.find_by(id: params[:group_id])
    if group.nil?
      render json: {message: "不存在改群组"}, status: 404
      return
    end
    if current_user.id != group.creater_id.to_i
      render json: {message: "你无权禁言，因为你不是创建者"}
      return
    end
    result = RongCloud::Api.new.groupUserGagAdd(userId: params[:user_id],groupId: params[:group_id],minute: params[:minute])
    if result.parsed_response["code"] == 200
      render json: {message: "禁言成功"}
    end
  end

  def user_gag_rollback
    param! :user_id, String, required: true
    param! :group_id, String, required: true
    group = Group.find_by(id: params[:group_id])
    if group.nil?
      render json: {message: "不存在改群组"}, status: 404
      return
    end
    if current_user.id != group.creater_id.to_i
      render json: {message: "你无权解除禁言，因为你不是创建者"}
    end
    result = RongCloud::Api.new.groupUserGagRollback(userId: params[:user_id],groupId: params[:group_id])
    if result.parsed_response["code"] == 200
      render json: {message: "解除禁言成功"}
    end
  end

  def user_gag_list
    param! :group_id, String, required: true
    group = Group.find_by(id: params[:group_id])
    if group.nil?
      render json: {message: "不存在改群组"}, status: 404
      return
    end
    result = RongCloud::Api.new.groupUserGagList(userId: params[:user_id],groupId: params[:group_id],minute: params[:minute])
    if result.parsed_response["code"] == 200
      render json: {users: result.parsed_response["users"]}
    end
  end

end
