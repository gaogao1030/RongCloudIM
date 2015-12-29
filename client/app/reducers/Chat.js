import { combineReducers } from 'redux';

function test(){
  return({
    test: "test"
  })
}

const ChatReducer = combineReducers({
  test
})

export default ChatReducer
