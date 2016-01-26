import React, { Component } from "react";
import { SET_MY_INFO } from "../constants.js";
import { connect } from 'redux-await';
import {
addSendMessage, getMyInfo, RongIMClientConnect,
getGroupInfo, RongIMClientSendGroupMessage,getRongIMGroupHistoryMessages,
setFetchHistoryMessageState,setLoadingState,resetUserToken
} from '../actions';
import AppBar from "material-ui/lib/app-bar";
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import SocialGroup from 'material-ui/lib/svg-icons/social/group';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import CircularProgress from 'material-ui/lib/circular-progress';
import ChatBox from "../components/ChatBox";
import { Link } from 'react-router';
import { pushPath } from 'redux-simple-router';
import {fetchMyInfo } from '../apis';
import "./Chat.scss";

export default class Chat extends Component {

  componentDidMount(){
  }

  componentWillMount(){
    const { dispatch,params } = this.props
    const { group_id } = params
    dispatch(getGroupInfo(group_id))
    dispatch(setLoadingState({fetchHistoryMessageState:true}))
    dispatch(getMyInfo())
    .then((user) =>
      dispatch({type: SET_MY_INFO,payload: {my_info: user}})
     )
    .then(()=>
      dispatch(RongIMClientConnect())
     )
    .then(function(){
      dispatch(setLoadingState({fetchHistoryMessageState:false}))
    },function(errCode){
      switch(errCode){
      case RongIMClient.ConnectErrorStatus.TOKEN_INCORRECT:
        dispatch(resetUserToken())
        break
      }
    })
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
      dispatch(RongIMClientSendGroupMessage(group_id,content)).then(function(){
        dispatch(addSendMessage(avatar,name,content))
      },function(errCode){
        switch(errCode){
          case null:
            alert("禁言中")
            break;
        }
        console.log("send faild")
      })
      inputMessageRef.clearValue()
    }
  }

  fetchHistoryMessage(e){
    const { dispatch,params} = this.props
    const { group_id } = params
    dispatch(setFetchHistoryMessageState(false))
    dispatch(getRongIMGroupHistoryMessages(group_id))
  }

  render (){
    const { dispatch,group_info,fetchHistoryMessageState,loadingState,params } = this.props
    const { name } = group_info
    const { group_id } = params
    return (
      <div>
      <AppBar
      title={name}
      iconElementLeft={
        <IconButton
          onClick={()=> dispatch(pushPath('/chat'))}
        >
          <NavigationClose />
        </IconButton>
      }
      iconElementRight={
        <IconButton
          onClick={()=> dispatch(pushPath(`/chat/${group_id}/members`))}
        >
          <SocialGroup />
        </IconButton>
      }
      />
      { fetchHistoryMessageState.availability &&
        !loadingState.fetchHistoryMessageState &&
          <FlatButton label="更多历史聊天记录"
          primary={true}
          style={{"width":"100%"}}
          onTouchTap={(e) => this.fetchHistoryMessage(e)}/>
      }
      { loadingState.fetchHistoryMessageState &&
        <CircularProgress model="indeterminate"
          style={
            {"margin":"0 auto 10px auto","display":"block"}
          }
          size={0.3}
        />
      }
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
    rong_im_client_instance: state.rong_im_client_instance,
    fetchHistoryMessageState: state.fetchHistoryMessageState,
    loadingState: state.loadingState
  }
}

export default connect(select)(Chat)
