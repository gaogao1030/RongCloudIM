import React, { Component } from "react";
//import { connect } from 'react-redux';
import { connect } from 'redux-await';
import GroupListBox from "../components/GroupListBox";
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import { getMyInfo, getMyGroups,getFindGroups } from '../actions/Chat';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default class Group extends Component {
  componentWillMount(){
    const { dispatch,statuses } = this.props
    dispatch(getMyGroups())
    dispatch(getFindGroups())
  }

  render (){
    const {my_info,statuses,errors} = this.props
    const {my_groups} = my_info
    const {find_groups} = my_info
    return (
      <Tabs>
        <Tab label="我加入的群组">
          { statuses.my_groups === 'pending'&&
            <p>请求pending中</p>
          }
          { statuses.my_groups === 'success'&&
            <GroupListBox groups={my_groups} />
          }
        </Tab>
        <Tab label="发现群组">
          { statuses.find_groups === 'pending'&&
            <p>请求pending中</p>
          }
          { statuses.find_groups === 'success'&&
            <GroupListBox groups={find_groups} />
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
