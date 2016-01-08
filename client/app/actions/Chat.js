import { ADD_MESSAGE, SET_MY_INFO,SET_MY_GROUPS,SET_FIND_GROUPS } from "../constants/Chat";
import ES6Promise,{Promise} from "es6-promise";
import fetch from "isomorphic-fetch";
import { AWAIT_MARKER } from 'redux-await'
import { fetchMyInfo,RongIMClientConnect,fetchMyGroups,fetchFindGroups } from '../apis'

ES6Promise.polyfill()

export function addMessage(avatar,name,content){
  return {
    type:ADD_MESSAGE,
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

export function RongIMClientConnectByAction(){
  return function(dispatch, getState){
    const user = getState().my_info.base_info
    RongIMClientConnect(user)
  }
}
