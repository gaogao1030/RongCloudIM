import { ADD_SEND_MESSAGE, ADD_RECEIVE_MESSAGE ,SET_MY_INFO,SET_MY_GROUPS,
SET_FIND_GROUPS,SET_GROUP_INFO,
ADD_FIND_GROUP,DEL_FIND_GROUP,
ADD_MY_GROUP,DEL_MY_GROUP,SAVE_LAST_CLICK_FIND_GROUP,
SET_RONG_IM_CLIENT_INSTANCE,ADD_HISTORY_SEND_MESSAGE,
ADD_HISTORY_RECEIVE_MESSAGE,SET_FETCH_HISTORY_MESSAGE_STATE,
SET_LOADING_STATE
} from "./constants.js";
import ES6Promise,{Promise} from "es6-promise";
import fetch from "isomorphic-fetch";
import { AWAIT_MARKER } from 'redux-await'
import { fetchMyInfo,fetchMyGroups,fetchFindGroups,fetchGroupInfo } from './apis'

ES6Promise.polyfill()

export function addMyGroup(id,name,creater_id){
  return {
    type: ADD_MY_GROUP,
    id,
    name,
    creater_id
  }
}

export function delFindGroup(index){
  return {
    type:DEL_FIND_GROUP,
    index
  }
}

export function addHistorySendMessage(avatar,name,content){
  return {
    type:ADD_HISTORY_SEND_MESSAGE,
    avatar:avatar,
    name:name,
    content:content
  }
}

export function addHistoryReceiveMessage(avatar,name,content){
  return {
    type:ADD_HISTORY_RECEIVE_MESSAGE,
    avatar:avatar,
    name:name,
    content:content
  }
}

export function addSendMessage(avatar,name,content){
  return {
    type:ADD_SEND_MESSAGE,
    avatar:avatar,
    name:name,
    content:content
  }
}

export function addReceiveMessage(avatar,name,content){
  return {
    type:ADD_RECEIVE_MESSAGE,
    avatar:avatar,
    name:name,
    content:content
  }
}

export function getMyInfo(){
  return {
    type: SET_MY_INFO,
    AWAIT_MARKER,
    payload:{
      my_info: fetchMyInfo()
    }
  }
}

export function getGroupInfo(id){
  return {
    type: SET_GROUP_INFO,
    AWAIT_MARKER,
    payload:{
      group_info: fetchGroupInfo(id)
    }
  }
}

export function getMyGroups(){
  return {
    type: SET_MY_GROUPS,
    AWAIT_MARKER,
    payload:{
      my_groups: fetchMyGroups()
    }
  }
}

export function getFindGroups(){
  return {
    type: SET_FIND_GROUPS,
    AWAIT_MARKER,
    payload:{
      find_groups: fetchFindGroups()
    }
  }
}

export function setLoadingState(state){
  return {
    type: SET_LOADING_STATE,
    state: state
  }
}

export function setFetchHistoryMessageState(availability){
  return {
    type: SET_FETCH_HISTORY_MESSAGE_STATE,
    availability:availability
  }
}

export function saveLastClickFindGroup(find_group){
  return {
    type: SAVE_LAST_CLICK_FIND_GROUP,
    last_click_find_group:find_group
  }
}

export function RongIMClientConnect(){
  return function(dispatch, getState){
    const promise = new Promise(function(resolve,reject){
      const me = getState().my_info
      if(RongIMClient.getInstance===undefined){
        RongIMClient.init(me.rongyun_app_key)
        RongIMClient.connect(me.rongyun_token,{
          onSuccess: function(userId){
            console.log("login with userId:"+ userId);
            dispatch(getRongIMClientInstance(RongIMClient.getInstance())),
            resolve(RongIMClient);
          },
          onError: function (errorCode) {
            reject(errorCode)
          }
        })
        RongIMClient.setConnectionStatusListener({
          onChanged: function(status){
            console.log(status);
          }
        })
        RongIMClient.getInstance().setOnReceiveMessageListener({
          onReceived: function(message) {
            const sender_id = String(message.getSenderUserId())
            const content = message.getContent()
            const members = getState().group_info.members
            const sender = members.filter(
            function(m){
              if(m.id == sender_id){
                return m
              }
            }
            )[0]
            const {email,name,avatar} = sender
            dispatch(addReceiveMessage(avatar,name,content))
          }
        })
        }else{
          resolve(RongIMClient);
        }
    })
  return promise
  }
}



export function RongIMClientSendGroupMessage(id,message){
  return function(dispatch,getState){
    const msn = RongIMClient.TextMessage.obtain(message);
    const conversationtype = RongIMClient.ConversationType.GROUP
    const targetId = String(id)
    RongIMClient.getInstance().sendMessage(conversationtype,targetId,msn,null,{
      onSuccess: function(){
        console.log("send success")
      },
      onError: function(errorCode){
        console.log(errorCode)
      }
    })
  }
}

export function getRongIMGroupHistoryMessages(id){
  return function(dispatch, getState){
    const promise = new Promise(function(resolve,reject){
      const conversationtype = RongIMClient.ConversationType.GROUP
      const targetId = String(id)
      dispatch(setLoadingState({fetchHistoryMessageState:true}))
      RongIMClient.getInstance().getHistoryMessages(conversationtype,targetId,20,{
        onSuccess: function(hasHistoryMessage,historyMessages){
          dispatch(setLoadingState({fetchHistoryMessageState:false}))
          historyMessages = historyMessages.reverse()
          const me = getState().my_info
          const members = getState().group_info.members
            for(let message of historyMessages){
              let sender_id = String(message.getSenderUserId())
              let sender = members.filter(
                function(m){
                  if(m.id == sender_id){
                    return m
                  }
                }
              )[0]
              let { avatar,name } = sender
              let content = message.getContent()
              if(sender.id == me.id){
                dispatch(addHistorySendMessage(avatar,name,content))
              } else {
                dispatch(addHistoryReceiveMessage(avatar,name,content))
              }
            }
            resolve()
          },
        onError: function(){
          reject()
        }
      })
    })
    return promise
  }
}

export function getRongIMClientInstance(instance){
  return {
    type: SET_RONG_IM_CLIENT_INSTANCE,
    rong_im_client_instance: instance
  }
}
