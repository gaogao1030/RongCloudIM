import React, { Component } from "react";
import { connect } from 'react-redux';
import { addMessage } from '../actions/Chat';
import ChatBox from "../components/ChatBox";
import "./Chat.scss";

export default class Chat extends Component {

  componentDidUpdate(){
  }

  componentWillMount(){
  }

  sendMessage(e,refs){
    const { dispatch } = this.props
    const { inputMessageRef } = refs;
    const content = inputMessageRef.getValue()
    dispatch(addMessage("http://7xjz3m.com1.z0.glb.clouddn.com/avatar%2Fgaogao.jpg","gaogao",content))
    inputMessageRef.setValue("")
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
    messages: state.messages
  }
}

export default connect(select)(Chat)
