import { combineReducers } from 'redux';
import { ADD_MESSAGE, SET_MY_INFO, SET_MY_GROUPS, SET_FIND_GROUPS, SET_GROUP_INFO,DEL_FIND_GROUP } from "./constants.js";
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

function my_groups(state=[],action){
  switch (action.type){
  case SET_MY_GROUPS:
    return action.payload.my_groups
  default:
    return state;
  }
}

function find_groups(state=[],action){
  switch (action.type){
  case SET_FIND_GROUPS:
    return action.payload.find_groups
  default:
    return state;
  }
}

function my_info(state={},action){
  switch (action.type){
  case SET_MY_INFO:
    return Object.assign({},
      state,
      action.payload.my_info
    );
  default:
    return state;
  }
}

function group_info(state={base_info:{}},action){
  switch (action.type){
  case SET_GROUP_INFO:
    return Object.assign({},state,
      action.payload.group_info
    )
  default:
    return state;
  }
}

const ChatReducer = combineReducers({
  messages,
  my_info,
  group_info,
  my_groups,
  find_groups,
  routing: routeReducer,
  await: awaitReducer,
})

export default ChatReducer
