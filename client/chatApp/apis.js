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

