import React, { Component } from "react";
import List from 'material-ui/lib/lists/list';
import MessageBox from "./MessageBox";
import { ADD_RECEIVE_MESSAGE,ADD_HISTORY_RECEIVE_MESSAGE } from "../constants.js";

const inversion_condition = function(message){
  return message.action_type == ADD_RECEIVE_MESSAGE
    || message.action_type == ADD_HISTORY_RECEIVE_MESSAGE ? false : true
}

export default class MessageListBox extends Component {
  render (){
    const { messages } = this.props
    return (
      <List style={{"backgroundColor":"none","paddingBottom":"35px"}}>
      {messages.map((message,index)=>
        <MessageBox {...message}
          key={index}
          inversion = {inversion_condition(message)}
          style = {inversion_condition(message) ? {"textAlign":"right"}:{}}
        />
      )}
      </List>
    )
  }
}
