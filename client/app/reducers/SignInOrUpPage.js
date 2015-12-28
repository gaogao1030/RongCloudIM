import { combineReducers } from 'redux';
import { SWITCH_COMPONENT,SIGN_IN_NOTICE } from "../actions/SignInOrUpPage";

function currentComponent(state="SignInBox",action){
  switch(action.type) {
  case SWITCH_COMPONENT:
    return action.currentComponent;
  default:
    return state;
  }
}

function signInBox(state={message:""},action) {
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


const SignInOrUpPageReducer = combineReducers({
  currentComponent,
  signInBox
});

export default SignInOrUpPageReducer;
