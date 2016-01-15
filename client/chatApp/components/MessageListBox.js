import React, { Component } from "react";
import List from 'material-ui/lib/lists/list';
import MessageBox from "./MessageBox";
import { ADD_RECEIVE_MESSAGE } from "../constants.js";

export default class MessageListBox extends Component {
  render (){
    const { messages } = this.props
    return (
      <List style={{"backgroundColor":"none","paddingBottom":"35px"}}>
      {messages.map((message,index)=>
        <MessageBox {...message}
          key={index}
          inversion = {message.action_type == ADD_RECEIVE_MESSAGE ? false : true}
          style = {message.action_type == ADD_RECEIVE_MESSAGE ? {} : {"textAlign":"right"}}
        />
      )}
      </List>
    )
  }
}
