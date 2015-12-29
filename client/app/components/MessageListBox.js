import React, { Component } from "react";
import List from 'material-ui/lib/lists/list';
import MessageBox from "./MessageBox";

export default class MessageListBox extends Component {
  render (){
    const {messages } = this.props
    return (
      <List style={{"backgroundColor":"none","paddingBottom":"35px"}}>
      {messages.map((message,index)=>
        <MessageBox {...message}
          key={index}
        />
      )}
      </List>
    )
  }
}
