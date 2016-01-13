import React, { Component } from "react";
import { connect } from 'redux-await';
import GroupListBox from "../components/GroupListBox";
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import { getMyInfo, getMyGroups,getFindGroups } from '../actions';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { pushPath } from 'redux-simple-router';
import { Link } from 'react-router';

injectTapEventPlugin();

export default class Group extends Component {
  componentWillMount(){
    const { dispatch,statuses } = this.props
    dispatch(getMyGroups())
    dispatch(getFindGroups())
  }

  onGroupBoxTouchTap(e,id){
    const { dispatch,statuses } = this.props
    console.log("touched")
    console.log(e)
    console.log(id)
    dispatch(pushPath("/chat/1"))
  }

  render (){
    const {my_info,statuses,errors} = this.props
    const {my_groups} = my_info
    const {find_groups} = my_info
    return (
      <Tabs>
        <Tab label="我加入的群组">
          <Link to='chat/1'>aaa</Link>
          { statuses.my_groups === 'pending'&&
            <p>请求pending中</p>
          }
          { statuses.my_groups === 'success'&&
            <GroupListBox groups={my_groups}
              onGroupBoxTouchTap={(e,id) => this.onGroupBoxTouchTap(e,id)}
            />
          }
          {
            statuses.my_groups === "failure" &&
            <p>没有群组</p>
          }
        </Tab>
        <Tab label="发现群组">
          { statuses.find_groups === 'pending'&&
            <p>请求pending中</p>
          }
          { statuses.find_groups === 'success'&&
            <GroupListBox groups={ find_groups } />
          }
          {
            statuses.find_groups === "failure" &&
            <p>没有群组</p>
          }
        </Tab>
      </Tabs>

    )
  }
}

function select(state){
  return {
    my_info:state.my_info
  }
}

export default connect(select)(Group)
