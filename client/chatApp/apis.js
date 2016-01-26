import "babel-polyfill"
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

export function joinGroup(id){
  const promise = new Promise(function(resolve,reject){
    fetch("/api/v1/groups/join",{
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        group_id: id
      })
    })
    .then(checkStatus)
    .then(parseJson)
    .then((data)=>
      resolve(data)
    ).catch((error)=>
      reject(error)
    )
  })
  return promise
}

export function fetchGroupMemberInfo(group_id,user_id){
  const promise = new Promise(function(resolve,reject){
    fetch(`/api/v1/groups/member_info?group_id=${group_id}&user_id=${user_id}`,{
      credentials: 'include'
    })
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

export function fetchGroupGagList(group_id){
  const promise = new Promise(function(resolve,reject){
    fetch(`/api/v1/groups/user/gag_list?group_id=${group_id}`,{credentials: 'include'})
    .then(checkStatus)
    .then(parseJson)
    .then(function(data){
      resolve(data.users)
    })
    .catch((error)=>
      reject(error)
    )
  })
  return promise
}

export function fetchGroupMemberInfoAndGroupGagList(group_id,user_id){
  const promise = new Promise(function(resolve,reject){
    Promise.all([fetchGroupMemberInfo(group_id,user_id),fetchGroupGagList(group_id)])
    .then(function([member_info,gag_list]){
      let gag_end_time={gag_end_time: false}
      for(let obj of gag_list){
        if(Number(obj.userId)===member_info.id){
          gag_end_time.gag_end_time=obj.time
        }
      }
      member_info = Object.assign(member_info,gag_end_time)
      resolve(member_info)
      },
      function(error){
        reject(error)
      }
    )
  })
  return promise
}

export function userGagAdd(group_id,user_id,minute){
  const promise = new Promise(function(resolve,reject){
    fetch("/api/v1/groups/user/gag_add",{
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        group_id: group_id,
        user_id: user_id,
        minute: minute
      })
    })
    .then(checkStatus)
    .then(parseJson)
    .then((data)=>
      resolve(data)
    ).catch((error)=>
      reject(error)
    )
  })
  return promise
}

export function userGagRollback(group_id,user_id){
  const promise = new Promise(function(resolve,reject){
    fetch("/api/v1/groups/user/gag_rollback",{
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        group_id: group_id,
        user_id: user_id
      })
    })
    .then(checkStatus)
    .then(parseJson)
    .then((data)=>
      resolve(data)
    ).catch((error)=>
      reject(error)
    )
  })
  return promise
}

export function resetRongYunToken(){
  const promise = new Promise(function(resolve,reject){
    fetch("/api/v1/users/reset_rongyun_token",{
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(checkStatus)
    .then(parseJson)
    .then((data)=>
      resolve(data)
    ).catch((error)=>
      reject(error)
    )
  })
  return promise
}
