import React, { Component } from "react";
import { connect } from 'react-redux';
import { addMessage, getMyInfo,RongIMClientConnect, RongIMClientSendMessage } from '../actions/Chat';
import AppBar from "material-ui/lib/app-bar";
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconButton from 'material-ui/lib/icon-button';
import ChatBox from "../components/ChatBox";
import { Link } from 'react-router';
import { pushPath } from 'redux-simple-router';
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
