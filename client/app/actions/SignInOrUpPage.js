import {ajax} from "jquery"
import {SWITCH_COMPONENT,SIGN_IN_NOTICE,SIGN_UP_NOTICE} from '../constants/SignInOrUpPage'

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
        dispatch(setSnackbarInfo(SIGN_IN_NOTICE,"登录成功",true,"成功"))
        window.location.href="/chat"
      },
      error: function(res){
        res = res.responseJSON
        dispatch(setSnackbarInfo(SIGN_IN_NOTICE,res.message,true,"错误"))
      }
    })
  }
}

export function signUp(account,password,name,password_confirm){
  return function(dispatch,getState){
    ajax({
      type: "POST",
      url: "/api/v1/users/sign_up",
      data: {email: account,password: password,name: name,password_confirmation: password_confirm},
      success: function(res){
        dispatch(setSnackbarInfo(SIGN_UP_NOTICE,"注册成功",true,"成功"))
        window.location.href="/chat"
      },
      error: function(res){
        res = res.responseJSON
        dispatch(setSnackbarInfo(SIGN_UP_NOTICE,res.message,true,"错误"))
      }
    })
  }
}

export function setSnackbarInfo(type=SIGN_IN_NOTICE,message,is_show,action){
  return { type: type,message: message,isShow:is_show,action: action}
}

