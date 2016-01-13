function checkStatus(response){
 if (response.status >= 200 && response.status < 300) {
   return response
 } else {
  const error = new Error(response.statusText)
  error.response = response
  throw error
 }
}

function parseJson(response){
  return response.json()
}

export function fetchMyGroups(){
  const promise = new Promise(function(resolve,reject){
    fetch("/api/v1/groups/my_list",{credentials: 'include'})
      .then(checkStatus)
      .then(parseJson)
      .then((data)=>
        resolve(data.groups)
      )
      .catch((error)=>
        reject(error)
      )
  })
  return promise
}

export function fetchGroupInfo(id){
  const promise = new Promise(function(resolve,reject){
    fetch(`/api/v1/groups/info?id=${id}`,{credentials: 'include'})
      .then(checkStatus)
      .then(parseJson)
      .then((data)=>
        resolve(data.group)
      )
      .catch((error)=>
        reject(error)
      )
  })
  return promise
}

export function fetchFindGroups(){
  const promise = new Promise(function(resolve,reject){
    fetch("/api/v1/groups/find_list",{credentials: 'include'})
      .then(checkStatus)
      .then(parseJson)
      .then((data)=>
         resolve(data.groups)
      )
      .catch((error)=>
        reject(error)
      )
  })
  return promise
}

export function fetchMyInfo(){
  const promise = new Promise(function(resolve,reject){
  fetch("/api/v1/users/info",{credentials: 'include'})
    .then(checkStatus)
    .then(parseJson)
    .then((data)=>
       resolve(data.user)
    ).catch((error)=>
      reject(error)
    )
  })
  return promise
}

export function RongIMClientConnect(user){
  const promise = new Promise(function(resolve,reject){
    const me = user
    if(RongIMClient.getInstance===undefined){
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
      }else{
        resolve();
      }
  })
  return promise
}

export function RongIMClientSendGroupMessage(id,message){
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
