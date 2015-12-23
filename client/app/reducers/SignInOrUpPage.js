import { combineReducers } from 'redux';
import { SWITCH_COMPONENT } from "../actions/SignInOrUpPage";

function currentComponent(state="SignIn",action){
  switch(action.type) {
  case SWITCH_COMPONENT:
    return action.currentPage;
  default:
    return state;
  }
}

const SignInOrUpPageReducer = combineReducers({
  currentComponent
});

export default SignInOrUpPageReducer;
