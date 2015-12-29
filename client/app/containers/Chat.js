import React, { Component } from "react";
import { connect } from 'react-redux';
import ChatBox from "../components/ChatBox";
import "./Chat.scss";

export default class Chat extends Component {

  componentDidUpdate(){
  }

  componentWillMount(){
  }


  render (){
    return (
      <ChatBox messages={this.props.messages}/>
    )
  }
}

function select(state){
  return {
    messages: [
      {name:"gaogao",avatar_src:"http://7xjz3m.com1.z0.glb.clouddn.com/avatar%2Fgaogao.jpg",text:"hello world"},
      {name:"gaogao",avatar_src:"http://7xjz3m.com1.z0.glb.clouddn.com/avatar%2Fgaogao.jpg",text:"hello world"},
      {name:"gaogao",avatar_src:"http://7xjz3m.com1.z0.glb.clouddn.com/avatar%2Fgaogao.jpg",text:"hello world"},
      {name:"gaogao",avatar_src:"http://7xjz3m.com1.z0.glb.clouddn.com/avatar%2Fgaogao.jpg",text:"hello world"},
      {name:"gaogao",avatar_src:"http://7xjz3m.com1.z0.glb.clouddn.com/avatar%2Fgaogao.jpg",text:"hello world"},
      {name:"gaogao",avatar_src:"http://7xjz3m.com1.z0.glb.clouddn.com/avatar%2Fgaogao.jpg",text:"hello world"},
      {name:"gaogao",avatar_src:"http://7xjz3m.com1.z0.glb.clouddn.com/avatar%2Fgaogao.jpg",text:"hello world"},
    ]
  }
}

export default connect(select)(Chat)
