import React, { Component } from "react";
import ListItem from "material-ui/lib/lists/list-item";
import Avatar from "material-ui/lib/avatar";
import Divider from 'material-ui/lib/divider';

export default class GroupBox extends Component {
  render (){
    return (
      <div>
        <ListItem value="1"
          primaryText="群组名字"
          leftAvatar={<Avatar>G</Avatar>}
        />
        <Divider />
      </div>
    )
  }
}
