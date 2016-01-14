import React, { Component } from "react";
import { connect } from 'redux-await';
import GroupListBox from "../components/GroupListBox";
import HintDialog from "../components/HintDialog";
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import {
getMyInfo, getMyGroups,getFindGroups,
delFindGroup,addMyGroup,saveLastClickFindGroup
} from '../actions';
import { joinGroup } from "../apis"
import injectTapEventPlugin from 'react-tap-event-plugin';
import { pushPath } from 'redux-simple-router';

injectTapEventPlugin();

export default class Group extends Component {
  handleDialogSubmit(e){
    const { dispatch,statuses,last_click_find_group } = this.props
    const { id,index } = last_click_find_group.props
    dispatch(delFindGroup(index))
    joinGroup(id).
    then(
      function(data){
        dispatch(pushPath(`/chat/${id}`))
      },
      function(err){
        alert(err)
      }
    )
  }

  componentWillMount(){
    const { dispatch,statuses } = this.props
    dispatch(getMyGroups())
    dispatch(getFindGroups())
  }

  onMyGroupBoxTouchTap(e,item){
    const { dispatch,statuses } = this.props
    const { id } = item.props
    dispatch(pushPath(`/chat/${id}`))
  }

  onFindGroupBoxTouchTap(e,item){
    const { dispatch,statuses } = this.props
    const { joinGroupHintDialog } = this.refs
    joinGroupHintDialog.handleOpen()
    dispatch(saveLastClickFindGroup(item))
  }


  render (){
    const {my_info,my_groups,find_groups,statuses,errors} = this.props
    return (
      <Tabs>
        <Tab label="我加入的群组">
          { statuses.my_groups === 'pending'&&
            <p>请求pending中</p>
          }
          { statuses.my_groups === 'success'&&
            <GroupListBox groups={my_groups}
              onGroupBoxTouchTap={(e,id) => this.onMyGroupBoxTouchTap(e,id)}
            />
          }
          {
            statuses.my_groups === "failure" &&
            <p>目前没有加入的群组</p>
          }
        </Tab>
        <Tab label="发现群组">
          { statuses.find_groups === 'pending'&&
            <p>请求pending中</p>
          }
          { statuses.find_groups === 'success'&&
            <GroupListBox groups={ find_groups }
              onGroupBoxTouchTap={(e,id) => this.onFindGroupBoxTouchTap(e,id)}
            />
          }
          {
            statuses.find_groups === "failure" &&
            <p>没有群组</p>
          }
          <HintDialog
            ref="joinGroupHintDialog"
            title = "是否加入该群组"
            handleSubmit={(e)=> this.handleDialogSubmit(e) }
          >
            <p>加入群组可以与该群组下的群组进行聊天</p>
          </HintDialog>
        </Tab>
      </Tabs>
    )
  }
}

function select(state){
  return {
    my_info:state.my_info,
    my_groups:state.my_groups,
    find_groups: state.find_groups,
    last_click_find_group: state.last_click_find_group
  }
}

export default connect(select)(Group)
