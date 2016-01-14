import React, { Component } from "react";
import { ADD_MESSAGE, SET_MY_INFO } from "../constants.js";
import { connect } from 'redux-await';
import { addMessage, getMyInfo, RongIMClientConnectByAction, getGroupInfo } from '../actions';
import AppBar from "material-ui/lib/app-bar";
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconButton from 'material-ui/lib/icon-button';
import ChatBox from "../components/ChatBox";
import { Link } from 'react-router';
import { pushPath } from 'redux-simple-router';
import {fetchMyInfo,  RongIMClientSendGroupMessage } from '../apis'
import "./Chat.scss";

export default class Chat extends Component {

  componentDidMount(){
  }

  componentWillMount(){
    const { dispatch,params } = this.props
    dispatch(getGroupInfo(params.id))
    fetchMyInfo()
    .then((user) =>
      dispatch({type: SET_MY_INFO,payload: {my_info: user}})
     )
    .then(()=>
      dispatch(RongIMClientConnectByAction())
     )
  }

  componentDidUpdate(){
  }

  sendMessage(e,refs){
    const { dispatch,my_info,group_info } = this.props;
    const { my_name } = my_info
    const group_id = group_info.id
    const { inputMessageRef } = refs;
    const content = inputMessageRef.getValue()
    RongIMClientSendGroupMessage(group_id,content)
    if(String(content).replace(/^\s+/,'').replace(/\s+$/,'')!=""){
      dispatch(addMessage("http://7xjz3m.com1.z0.glb.clouddn.com/avatar%2Fgaogao.jpg",my_name,content))
      inputMessageRef.clearValue()
    }
  }

  render (){
    const { dispatch,group_info } = this.props
    const { name } = group_info
    return (
      <div>
      <AppBar
      title={name}
      iconElementLeft={<IconButton
        onClick={()=> dispatch(pushPath('/chat'))}
        ><NavigationClose /></IconButton>}
      />
      <ChatBox
        messages={this.props.messages}
        sendMessage={(e,refs) => this.sendMessage(e,refs)}
      />
      </div>
    )
  }
}

function select(state){
  return {
    messages: state.messages,
    my_info: state.my_info,
    group_info: state.group_info
  }
}

export default connect(select)(Chat)
