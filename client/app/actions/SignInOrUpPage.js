import {ajax} from "jquery"
export const SWITCH_COMPONENT = "SWITCH_COMPONENT"
export const SIGN_IN_NOTICE = "SIGN_IN_NOTICE"

export function switchComponent(currentComponent) {
  return { type: SWITCH_COMPONENT,currentComponent }
}

export function signIn(account,password,remember_me){
  return function(dispatch,getState){
    ajax({
      type: "POST",
      url: "http://localhost:3000/api/v1/users/sign_in",
      data: {email: account,password: password,remember_me: remember_me},
      success: function(res){
        dispatch(setSuccessInfo("登录成功",true))
      },
      error: function(res){
        res = res.responseJSON
        dispatch(setErrorInfo(res.message,true))
      }
    })
  }
}

function setErrorInfo(message,is_show){
  return { type:SIGN_IN_NOTICE,message: message,isShow:is_show,action: "error" }
}

function setSuccessInfo(message,is_show){
  return { type:SIGN_IN_NOTICE,message: message,isShow:is_show,action: "success" }
}
