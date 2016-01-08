import { combineReducers } from 'redux';
import { ADD_MESSAGE, SET_MY_INFO } from "../constants/Chat";
import { routeReducer } from 'redux-simple-router';
import { reducer as awitReducer } from 'redux-await';

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

function my_info(state={data:{}},action){
  switch (action.type){
  case SET_MY_INFO:
    return {
      data:action.payload.my_info
    }
  default:
    return state;
  }
}


const ChatReducer = combineReducers({
  messages,
  my_info,
  routing: routeReducer,
  await: awitReducer
})

export default ChatReducer
