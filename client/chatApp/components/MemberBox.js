import React, { Component } from "react";
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from "material-ui/lib/avatar";
import Divider from 'material-ui/lib/divider';


export default class MemberBox extends Component {
  render(){
    const { name,avatar,is_me, is_creater } = this.props
    return (
      <div>
        <ListItem
          primaryText={ name }
          leftAvatar={
            <Avatar
              src={ avatar }
            />
          }
          rightIcon={
            is_me?
            <p style={{
            "top":"16px",
            "color":"#000000"
            }}>我</p>
            :
            <p></p>
          }
          secondaryText={
            is_creater?"创建者":"成员"
          }
        />
        <Divider />
      </div>
    )
  }
}
