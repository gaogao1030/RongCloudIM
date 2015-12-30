import React, { Component } from "react";
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import MessageListBox from "./MessageListBox";
import TextField from "material-ui/lib/text-field";
import IconButton from "material-ui/lib/icon-button";
import FontIcon from "material-ui/lib/font-icon";
import RaiseButton from "material-ui/lib/raised-button";
import $ from "jquery";


export default class ChatBox extends Component {
  onEnterKeyDown(e){
    const refs= {
      inputMessageRef: this.refs.inputMessage
    }
    this.props.sendMessage(e,refs)
  }

  componentDidUpdate(){
    this.scrollToBottom()
  }

  scrollToBottom(){
    const $e=$(".chatBox")
    const scrollHeight = $e.prop("scrollHeight")
    $e.scrollTop(scrollHeight)
  }

  render (){
    const { messages } = this.props
    return (
      <div className="chatBox">
        <MessageListBox messages={messages}/>
        <div
          style={{"position":"fixed","bottom":"0px","width":"80%","left":"0","right":"0","margin":"0 auto"}}
        >
        <TextField
          ref="inputMessage"
          hintText="输入要发送的信息"
          underlineStyle={{"borderColor": "#4caf50"}}
          fullWidth={true}
          onEnterKeyDown={(e)=>this.onEnterKeyDown(e)}
        />
        </div>
      </div>
    )
  }
}
