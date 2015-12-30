import { ADD_MESSAGE } from "../constants/Chat"

export function addMessage(avatar,name,content){
  return {
    type:ADD_MESSAGE,
    avatar:avatar,
    name:name,
    content:content
  }
}
