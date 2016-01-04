import { ADD_MESSAGE, SET_MY_INFO } from "../constants/Chat"
import ES6Promise,{Promise} from "es6-promise"
import fetch from "isomorphic-fetch"

ES6Promise.polyfill()

export function addMessage(avatar,name,content){
  return {
    type:ADD_MESSAGE,
    avatar:avatar,
    name:name,
    content:content
  }
}

function setMyInfo(user){
  return {
    type: SET_MY_INFO,
    email: user.email,
    id: user.id,
    name: user.name,
    rongyun_app_key: user.rongyun_app_key,
    rongyun_token: user.rongyun_token
  }
}

export function getMyInfo(){
  return function(dispatch,getState){
    const promise = new Promise(function(resolve,reject){
    fetch("/api/v1/users/info",{credentials: 'include'})
      .then(response => response.json())
      .then((json) =>
         dispatch(setMyInfo(json.user))
      ).then(()=>
         resolve()
      )
    })
    return promise
  }
}

export function RongIMClientConnect(){
  return function(dispatch,getState){
    const promise = new Promise(function(resolve,reject){
      const me = getState().my_info
      RongIMClient.init(me.rongyun_app_key)
      RongIMClient.connect(me.rongyun_token,{
        onSuccess: function(userId){
          console.log("login with userId:"+ userId);
          resolve();
        },
        onError: function (errorCode) {
          console.log(errorCode);
        }
      })
      RongIMClient.setConnectionStatusListener({
        onChanged: function(status){
          console.log(status);
        }
      })
      RongIMClient.getInstance().setOnReceiveMessageListener({
        onReceived: function(message) {
          console.log(message);
        }
      })
    })
    return promise
  }
}

export function RongIMClientSendMessage(){
  return function(dispatch,getState){
    const msn = RongIMClient.TextMessage.obtain("hello by gaogao");
    const conversationtype = RongIMClient.ConversationType.GROUP
    const targetId = "18"
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
