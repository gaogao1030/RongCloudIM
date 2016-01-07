import React, { Component } from "react";
import { connect } from 'react-redux';
import GroupListBox from "../components/GroupListBox";
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import { getMyInfo } from '../actions/Chat';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default class Group extends Component {
  componentWillMount(){
    const { dispatch } = this.props
    this.setState({MyInfoGot: true})
    dispatch(getMyInfo()).then(()=>
      this.setState({MyInfoGot: false})
    )
  }

  render (){
    const {my_info} = this.props
    const {MyInfoGot} = this.state
    return (
      <Tabs>
        <Tab label="我的群组">
          {!MyInfoGot &&
            <GroupListBox
              groups={my_info.my_groups}
            />
          }
          {MyInfoGot &&
            <p>没有得到我的信息</p>
          }
        </Tab>
        <Tab label="发现群组">
          <p>find groups</p>
        </Tab>
      </Tabs>

    )
  }
}

function select(state){
  return {
    my_info: state.my_info
  }
}

export default connect(select)(Group)
