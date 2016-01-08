import React, { Component } from "react";
//import { connect } from 'react-redux';
import { connect } from 'redux-await';
import GroupListBox from "../components/GroupListBox";
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import { getMyInfo } from '../actions/Chat';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default class Group extends Component {
  componentWillMount(){
    const { dispatch } = this.props
    //this.setState({MyInfoGot: true})
    //dispatch(getMyInfo()).then(()=>
    //  this.setState({MyInfoGot: false})
    //)
    dispatch(getMyInfo())
  }

  render (){
    const {my_info} = this.props
    return (
      <Tabs>
        <Tab label="我加入的群组">
          <p>my groups</p>
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
    my_info:state.my_info
  }
}

export default connect(select)(Group)
