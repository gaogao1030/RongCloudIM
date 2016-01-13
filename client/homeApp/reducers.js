import { combineReducers } from 'redux';
import {SWITCH_COMPONENT,SIGN_IN_NOTICE,SIGN_UP_NOTICE} from './constants'

function currentComponent(state="SignInBox",action){
  switch(action.type) {
  case SWITCH_COMPONENT:
    return action.currentComponent;
  default:
    return state;
  }
}

function signInBox(state={message:"",isShow:false,action:""},action) {
  switch(action.type) {
  case SIGN_IN_NOTICE:
    return({
      message: action.message,
      isShow: action.isShow,
      action: action.action
    })
  default:
    return state;
  }
}

function signUpBox(state={message:"",isShow:false,action:""},action) {
  switch(action.type) {
  case SIGN_UP_NOTICE:
    return({
      message: action.message,
      isShow: action.isShow,
      action: action.action
    })
  default:
    return state;
  }
}

const SignInOrUpPageReducer = combineReducers({
  currentComponent,
  signInBox,
  signUpBox
});

export default SignInOrUpPageReducer;
