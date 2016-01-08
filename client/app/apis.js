export function fetchMyInfo(){
  const promise = new Promise(function(resolve,reject){
  fetch("/api/v1/users/info",{credentials: 'include'})
    .then(response => response.json())
    .then((json) =>
      json.user
    )
    .then((user)=>
       resolve(user)
    )
  })
  return promise
}

export function RongIMClientConnect(user){
  const promise = new Promise(function(resolve,reject){
    const me = user
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

export function RongIMClientSendMessage(){
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
