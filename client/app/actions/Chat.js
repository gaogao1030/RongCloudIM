import { ADD_MESSAGE, SET_MY_INFO } from "../constants/Chat";
import ES6Promise,{Promise} from "es6-promise";
import fetch from "isomorphic-fetch";
import { AWAIT_MARKER } from 'redux-await'
import { fetchMyInfo,RongIMClientConnect } from '../apis'

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

export function RongIMClientConnectByAction(){
  return function(dispatch, getState){
    console.log(getState())
    const user = getState().my_info.data
    RongIMClientConnect(user)
  }
}
