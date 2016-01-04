import { combineReducers } from 'redux';
import { ADD_MESSAGE, SET_MY_INFO } from "../constants/Chat";

function messages(state=[],action){
  switch (action.type){
  case ADD_MESSAGE:
    return [...state,{
      avatar: action.avatar,
      name: action.name,
      content:action.content
    }];
  default:
    return state;
  }
}

function my_info(state={},action){
  switch (action.type){
  case SET_MY_INFO:
    return {
      id: action.id,
      email: action.email,
      name: action.name,
      rongyun_token: action.rongyun_token,
      rongyun_app_key: action.rongyun_app_key
    }
  default:
    return state;
  }
}


const ChatReducer = combineReducers({
  messages,
  my_info
})

export default ChatReducer
