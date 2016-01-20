import React, { Component } from "react";
import { getGroupMemberInfo, getGroupInfo } from '../actions';
import { connect } from 'redux-await';
import AppBar from "material-ui/lib/app-bar";
import IconButton from 'material-ui/lib/icon-button';
import HardwareKeyboardBackspace from 'material-ui/lib/svg-icons/hardware/keyboard-backspace';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import Avatar from "material-ui/lib/avatar";
import { pushPath } from 'redux-simple-router';
import Divider from 'material-ui/lib/divider';
import CommunicationEmail from 'material-ui/lib/svg-icons/communication/email';
import CardActions from 'material-ui/lib/card/card-actions';
import RaisedButton from 'material-ui/lib/raised-button';

const creater_condition=function(creater,member){
  if(creater.id === member.id){
    return true
  } else {
    return false
  }
}

export default class MemberInfo extends Component {
  componentWillMount(){
    const { dispatch,params } = this.props
    const {group_id,member_id} = params
    dispatch(getGroupInfo(group_id))
    dispatch(getGroupMemberInfo(group_id,member_id)).then(()=>
      console.log("yeahhhh!")
    )
  }

  render(){
    const { params,dispatch,group_member_info,statuses,group_info } = this.props
    const {group_id,member_id} = params
    const {name,email,avatar,gag_end_time} = group_member_info
    return (
      <div>
      <AppBar
        title="成员资料"
        iconElementLeft={
          <IconButton
            onTouchTap={(e)=>
              dispatch(pushPath(`/chat/${group_id}/members`))
            }
          >
            <HardwareKeyboardBackspace />
          </IconButton>
        }
      />
      { statuses.group_member_info === 'pending' &&
        <p>请求pending中</p>
      }
      { statuses.group_member_info === 'success' &&
        <Card>
          <CardHeader
            title={ name }
            subtitle= {creater_condition({id:Number(group_info.creater_id)},group_member_info)?"创建者":"成员"}
            avatar={<Avatar src={avatar}/>}
          />
          <Divider />
          <ListItem
            disabled={true}
            leftIcon={<CommunicationEmail />}
            primaryText={ email }
          />
          <Divider />
          <ListItem
            disabled={true}
          >
            <b>禁言解除时间:</b>
            <span style={{"marginLeft":"15px"}}>{gag_end_time?gag_end_time:"无禁言"}</span>
          </ListItem>
          <Divider />
          <CardActions style={{"position":"absolute","bottom":"8px","width":"100%","padding":"0"}}>
            <div
            style={{"width":"50%","display":"inline-block","marginRight":"0","textAlign":"center"}}
            >
            <RaisedButton secondary={true} label="开始禁言"
            style={{"width":"90%"}}
            onTouchTap={(e)=>alert("start")}
            />
            </div>
            <div
            style={{"width":"50%","display":"inline-block","marginRight":"0","textAlign":"center"}}
            >
            <RaisedButton label="解除禁言"
            style={{"width":"90%"}}
            onTouchTap={(e)=>alert("end")}
            />
            </div>
          </CardActions>
        </Card>
      }
      </div>
    )
  }
}

function select(state){
  return {
    group_member_info: state.group_member_info,
    group_info: state.group_info
  }
}

export default connect(select)(MemberInfo)
