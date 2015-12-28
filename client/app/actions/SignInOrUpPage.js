import {ajax} from "jquery"
import {SWITCH_COMPONENT,SIGN_IN_NOTICE} from '../constants/SignInOrUpPage'

export function switchComponent(currentComponent) {
  return { type: SWITCH_COMPONENT,currentComponent }
}

export function signIn(account,password,remember_me){
  return function(dispatch,getState){
    ajax({
      type: "POST",
      url: "/api/v1/users/sign_in",
      data: {email: account,password: password,remember_me: remember_me},
      success: function(res){
        dispatch(setSnackbarInfo(undefined,"登录成功",true,"成功"))
        window.location.href="/chat"
      },
      error: function(res){
        res = res.responseJSON
        dispatch(setSnackbarInfo(undefined,res.message,true,"错误"))
      }
    })
  }
}

export function setSnackbarInfo(type=SIGN_IN_NOTICE,message,is_show,action){
  return { type: type,message: message,isShow:is_show,action: action}
}

