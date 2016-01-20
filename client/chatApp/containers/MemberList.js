import React, { Component } from "react";
import AppBar from "material-ui/lib/app-bar";
import MemberListBox from "../components/MemberListBox";
import IconButton from 'material-ui/lib/icon-button';
import HardwareKeyboardBackspace from 'material-ui/lib/svg-icons/hardware/keyboard-backspace';
import { connect } from 'redux-await';
import { pushPath } from 'redux-simple-router';
import {
getGroupInfo,getMyInfo
} from '../actions';

export default class MemberList extends Component {
  componentWillMount(){
    const { dispatch,params } = this.props
    const { group_id } = params
    dispatch(getGroupInfo(group_id))
    dispatch(getMyInfo())
  }

  render() {
    const { params,dispatch,group_info,statuses,my_info } = this.props
    const { members,name,creater_id } = group_info
    const { group_id } = params
    return (
      <div>
        <AppBar
          title={
            statuses.group_info === 'success' &&
            name+"组的成员"
          }
          iconElementLeft={
            <IconButton
              onTouchTap={(e)=>
                dispatch(pushPath(`/chat/${group_id}`))
              }
            >
              <HardwareKeyboardBackspace />
            </IconButton>
          }
        />
        { statuses.group_info === 'pending' &&
          <p>请求pending中</p>
        }
        { statuses.group_info === 'success' &&
          <MemberListBox members={ members }
            my_info={ my_info }
            group_info={ group_info }
            handleTouchTap={ (e,group_id,member_id) =>
              dispatch(pushPath(`/chat/${group_id}/members/${member_id}`))
            }
          />
        }
      </div>
    )
  }
}

function select(state){
  return {
    group_info: state.group_info,
    my_info: state.my_info
  }
}

export default connect(select)(MemberList)
