import React, { Component } from "react";
import { SET_MY_INFO } from "../constants.js";
import { connect } from 'redux-await';
import {
addSendMessage, getMyInfo, RongIMClientConnect,
getGroupInfo, RongIMClientSendGroupMessage,getRongIMGroupHistoryMessages
} from '../actions';
import AppBar from "material-ui/lib/app-bar";
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import ChatBox from "../components/ChatBox";
import { Link } from 'react-router';
import { pushPath } from 'redux-simple-router';
import {fetchMyInfo } from '../apis'
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
      dispatch(RongIMClientConnect())
     )
    .then(()=>
      //dispatch(getRongIMGroupHistoryMessages(params.id))
      console.log("can able fetch histroy")
    )
  }

  componentDidUpdate(){
  }

  sendMessage(e,refs){
    const { dispatch,my_info,group_info } = this.props;
    const { name,avatar } = my_info
    const group_id = group_info.id
    const { inputMessageRef } = refs;
    const content = inputMessageRef.getValue()
    if(String(content).replace(/^\s+/,'').replace(/\s+$/,'')!=""){
      dispatch(RongIMClientSendGroupMessage(group_id,content))
      dispatch(addSendMessage(avatar,name,content))
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
      <FlatButton label="更多历史聊天记录"
      primary={true}
      style={{"width":"100%"}}
      onTouchTap={this.fetchHistoyMessage}/>
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
    group_info: state.group_info,
    rong_im_client_instance: state.rong_im_client_instance
  }
}

export default connect(select)(Chat)
