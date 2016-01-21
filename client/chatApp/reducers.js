import { combineReducers } from 'redux';
import "babel-polyfill";
import {
ADD_SEND_MESSAGE, ADD_RECEIVE_MESSAGE,
SET_MY_INFO, SET_MY_GROUPS,
SET_FIND_GROUPS, SET_GROUP_INFO,
DEL_FIND_GROUP,ADD_FIND_GROUP,
ADD_MY_GROUP,DEL_MY_GROUP,SAVE_LAST_CLICK_FIND_GROUP,
SET_RONG_IM_CLIENT_INSTANCE,ADD_HISTORY_SEND_MESSAGE,
ADD_HISTORY_RECEIVE_MESSAGE,SET_FETCH_HISTORY_MESSAGE_STATE,
SET_LOADING_STATE,ADD_HISTORY_MESSAGES,SET_GROUP_MEMBER_INFO
} from "./constants.js";
import { routeReducer } from 'redux-simple-router';
import { reducer as awaitReducer } from 'redux-await';
import { UPDATE_PATH } from 'redux-simple-router';

function group_member_info(state={},action){
  switch (action.type){
  case SET_GROUP_MEMBER_INFO:
    return Object.assign({},action.payload.group_member_info)
  default:
    return state
  }
}

function loadingState(state={},action){
  switch (action.type) {
  case SET_LOADING_STATE:
    return Object.assign({},action.state)
  default:
    return state
  }
}

function fetchHistoryMessageState(state={availability:true},action){
  switch (action.type) {
  case SET_FETCH_HISTORY_MESSAGE_STATE:
    return Object.assign({},{availability:action.availability})
  default:
    return state
  }
}

function messages(state=[],action){
  switch (action.type){
  case ADD_SEND_MESSAGE:
    return [...state,{
      avatar: action.avatar,
      name: action.name,
      content:action.content,
      action_type: action.type
    }];
  case ADD_RECEIVE_MESSAGE:
    return [...state,{
      avatar: action.avatar,
      name: action.name,
      content:action.content,
      action_type: action.type
    }];
  case ADD_HISTORY_SEND_MESSAGE:
    return [{
      avatar: action.avatar,
      name: action.name,
      content:action.content,
      action_type: action.type
    },...state];
  case ADD_HISTORY_RECEIVE_MESSAGE:
    return [{
      avatar: action.avatar,
      name: action.name,
      content:action.content,
      action_type: action.type
    },...state];
  case ADD_HISTORY_MESSAGES:
    return [...action.historyMessages,...state]
  default:
    return state;
  }
}

function my_groups(state=[],action){
  switch (action.type){
  case SET_MY_GROUPS:
    return action.payload.my_groups
  case ADD_MY_GROUP:
    return [...state,{
      id:action.id,
      name:action.name,
      creater_id:action.creater_id
    }]
  case DEL_MY_GROUP:
    return Object.assign([],
      state.filter(function(group,index){
        if(index!==action.index){
          return group;
        }
      })
    );
  default:
    return state
  }
}

function find_groups(state=[],action){
  switch (action.type){
  case SET_FIND_GROUPS:
    return action.payload.find_groups
  case ADD_FIND_GROUP:
    return [...state,{
      id:action.id,
      name:action.name,
      creater_id:action.creater_id
    }]
  case DEL_FIND_GROUP:
    return Object.assign([],
      state.filter(function(group,index){
        if(index!==action.index){
          return group;
        }
      })
    );
  default:
    return state;
  }
}

function last_click_find_group(state={},action){
  switch (action.type){
  case SAVE_LAST_CLICK_FIND_GROUP:
    return Object.assign({},action.last_click_find_group);
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

function group_info(state={},action){
  switch (action.type){
  case SET_GROUP_INFO:
    return Object.assign({},
      state,
      action.payload.group_info
    )
  default:
    return state;
  }
}

function rong_im_client_instance(state={},action){
  switch (action.type){
  case SET_RONG_IM_CLIENT_INSTANCE:
    return Object.assign({},action.rong_im_client_instance)
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
  rong_im_client_instance,
  last_click_find_group,
  fetchHistoryMessageState,
  loadingState,
  group_member_info,
  routing: routeReducer,
  await: awaitReducer,
})

export default ChatReducer
