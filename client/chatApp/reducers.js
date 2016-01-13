import { combineReducers } from 'redux';
import { ADD_MESSAGE, SET_MY_INFO, SET_MY_GROUPS, SET_FIND_GROUPS } from "./constants.js";
import { routeReducer } from 'redux-simple-router';
import { reducer as awaitReducer } from 'redux-await';
import { UPDATE_PATH } from 'redux-simple-router';


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

function my_info(state={base_info:{},my_groups:[],find_groups:[]},action){
  switch (action.type){
  case SET_MY_INFO:
    return Object.assign({},state,{
      base_info:action.payload.my_info
    })
  case SET_MY_GROUPS:
    return Object.assign({},state,{
      my_groups:action.payload.my_groups
    })
  case SET_FIND_GROUPS:
    return Object.assign({},state,{
      find_groups: action.payload.find_groups
    })
  default:
    return state;
  }
}


const ChatReducer = combineReducers({
  messages,
  my_info,
  routing: routeReducer,
  await: awaitReducer,
})

export default ChatReducer
