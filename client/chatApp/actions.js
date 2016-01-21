import { ADD_SEND_MESSAGE, ADD_RECEIVE_MESSAGE ,SET_MY_INFO,SET_MY_GROUPS,
SET_FIND_GROUPS,SET_GROUP_INFO,
ADD_FIND_GROUP,DEL_FIND_GROUP,
ADD_MY_GROUP,DEL_MY_GROUP,SAVE_LAST_CLICK_FIND_GROUP,
SET_RONG_IM_CLIENT_INSTANCE,ADD_HISTORY_SEND_MESSAGE,
ADD_HISTORY_RECEIVE_MESSAGE,SET_FETCH_HISTORY_MESSAGE_STATE,
SET_LOADING_STATE,ADD_HISTORY_MESSAGES,SET_GROUP_MEMBER_INFO
} from "./constants.js";
import ES6Promise,{Promise} from "es6-promise";
import fetch from "isomorphic-fetch";
import { AWAIT_MARKER } from 'redux-await'
import {
fetchMyInfo,fetchMyGroups,fetchFindGroups,fetchGroupInfo,
fetchGroupMemberInfoAndGroupGagList,userGagAdd,userGagRollback
} from './apis'
import "babel-polyfill"

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

export function addHistoryMessages(historyMessages){
  return {
    type: ADD_HISTORY_MESSAGES,
    historyMessages: historyMessages
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
  const promise = fetchMyInfo()
  return function(dispatch, getState){
    dispatch({
      type: SET_MY_INFO,
      AWAIT_MARKER,
      payload:{
        my_info: promise
      }
    })
    return promise
  }
}

export function getGroupInfo(id){
  const promise = fetchGroupInfo(id)
  return function(dispatch, getState){
    dispatch({
      type: SET_GROUP_INFO,
      AWAIT_MARKER,
      payload:{
        group_info: promise
      }
    })
    return promise
  }
}

export function getMyGroups(){
  const promise = fetchMyGroups()
  return function(dispatch, getState){
    dispatch({
      type: SET_MY_GROUPS,
      AWAIT_MARKER,
      payload:{
        my_groups: promise
      }
    })
    return promise
  }
}

export function getFindGroups(){
  const promise = fetchFindGroups()
  return function(dispatch, getState){
    dispatch({
      type: SET_FIND_GROUPS,
      AWAIT_MARKER,
      payload:{
        find_groups: promise
      }
    })
    return promise
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
    const promise = new Promise(function(resolve,reject){
      const msn = RongIMClient.TextMessage.obtain(message);
      const conversationtype = RongIMClient.ConversationType.GROUP
      const targetId = String(id)
      RongIMClient.getInstance().sendMessage(conversationtype,targetId,msn,null,{
        onSuccess: function(){
          resolve()
        },
        onError: function(errCode){
          reject(errCode)
        }
      })
    })
    return promise
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
          const me = getState().my_info
          const members = getState().group_info.members
          let addHistoryMessageList=[]
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
                addHistoryMessageList.push({
                  avatar: avatar,
                  name: name,
                  content: content,
                  action_type: ADD_HISTORY_SEND_MESSAGE
                })
              } else {
                addHistoryMessageList.push({
                  avatar: avatar,
                  name: name,
                  content: content,
                  action_type: ADD_HISTORY_RECEIVE_MESSAGE
                })
              }
            }
            dispatch(addHistoryMessages(addHistoryMessageList))
            dispatch(setLoadingState({fetchHistoryMessageState:false}))
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

export function getGroupMemberInfo(group_id,user_id){
  const promise = fetchGroupMemberInfoAndGroupGagList(group_id,user_id)
  return function(dispatch, getState){
    dispatch({
      type: SET_GROUP_MEMBER_INFO,
      AWAIT_MARKER,
      payload:{
        group_member_info: promise
      }
    })
    return promise
  }
}

export function gagAdd(group_id,user_id,minute="60"){
  return function(dispatch, getState){
    return userGagAdd(group_id,user_id,minute)
  }
}

export function gagRollback(group_id,user_id){
  return function(dispatch, getState){
    return userGagRollback(group_id,user_id)
  }
}

