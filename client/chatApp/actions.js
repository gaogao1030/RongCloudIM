import { ADD_MESSAGE, SET_MY_INFO,SET_MY_GROUPS,SET_FIND_GROUPS,SET_GROUP_INFO , ADD_GROUP, DEL_FIND_GROUP } from "./constants.js";
import ES6Promise,{Promise} from "es6-promise";
import fetch from "isomorphic-fetch";
import { AWAIT_MARKER } from 'redux-await'
import { fetchMyInfo,RongIMClientConnect,fetchMyGroups,fetchFindGroups,fetchGroupInfo } from './apis'

ES6Promise.polyfill()

export function addGroup(id,name,creater_id){
  return {
    type: ADD_GROUP,
    id,
    name,
    creater_d
  }
}

export function delFindGroup(index){
  return {
    type:DEL_FIND_GROUP,
    index
  }
}

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

export function RongIMClientConnectByAction(){
  return function(dispatch, getState){
    const user = getState().my_info
    RongIMClientConnect(user)
  }
}
