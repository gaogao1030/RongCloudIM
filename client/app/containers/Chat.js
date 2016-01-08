import React, { Component } from "react";
import { ADD_MESSAGE, SET_MY_INFO } from "../constants/Chat";
import { connect } from 'redux-await';
import { addMessage, getMyInfo, RongIMClientConnectByAction } from '../actions/Chat';
import AppBar from "material-ui/lib/app-bar";
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconButton from 'material-ui/lib/icon-button';
import ChatBox from "../components/ChatBox";
import { Link } from 'react-router';
import { pushPath } from 'redux-simple-router';
import {fetchMyInfo,  RongIMClientSendMessage } from '../apis'
import "./Chat.scss";

export default class Chat extends Component {

  componentDidMount(){
  }

  componentWillMount(){
    const { dispatch } = this.props
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
    const { dispatch,my_info } = this.props;
    const { data } = my_info;
    const { inputMessageRef } = refs;
    const content = inputMessageRef.getValue()
    RongIMClientSendMessage()
    if(String(content).replace(/^\s+/,'').replace(/\s+$/,'')!=""){
      dispatch(addMessage("http://7xjz3m.com1.z0.glb.clouddn.com/avatar%2Fgaogao.jpg",data.name,content))
      inputMessageRef.clearValue()
    }
  }


  render (){
    const { dispatch } = this.props
    return (
      <div>
      <AppBar
      title="群组名字"
      iconElementLeft={<IconButton
        onClick={()=> dispatch(pushPath('/group'))}
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
    my_info: state.my_info
  }
}

export default connect(select)(Chat)
