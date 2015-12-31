import React, { Component } from "react";
import { connect } from 'react-redux';
import { addMessage, getMyInfo,RongIMClientConnect, RongIMClientSendMessage } from '../actions/Chat';
import ChatBox from "../components/ChatBox";
import "./Chat.scss";

export default class Chat extends Component {

  componentDidMount(){
  }

  componentWillMount(){
    const { dispatch } = this.props
    dispatch(getMyInfo())
      .then(()=>
         dispatch(RongIMClientConnect())
       ).then(()=>
         console.log("connected")
       )
  }

  sendMessage(e,refs){
    const { dispatch } = this.props
    const { inputMessageRef } = refs;
    const content = inputMessageRef.getValue()
    dispatch(RongIMClientSendMessage())
    if(String(content).replace(/^\s+/,'').replace(/\s+$/,'')!=""){
      dispatch(addMessage("http://7xjz3m.com1.z0.glb.clouddn.com/avatar%2Fgaogao.jpg","gaogao",content))
      inputMessageRef.setValue("")
    }
  }


  render (){
    return (
      <ChatBox messages={this.props.messages}
        sendMessage={(e,refs) => this.sendMessage(e,refs)}
      />
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
