import { combineReducers } from 'redux';
import { ADD_MESSAGE } from "../constants/Chat";

//function messages(state={avatar:"http://7xjz3m.com1.z0.glb.clouddn.com/avatar%2Fgaogao.jpg",name:"",content:""},action){
//}
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

const ChatReducer = combineReducers({
  messages
})

export default ChatReducer
