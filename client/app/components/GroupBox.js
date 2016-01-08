import React, { Component } from "react";
import ListItem from "material-ui/lib/lists/list-item";
import Avatar from "material-ui/lib/avatar";
import Divider from 'material-ui/lib/divider';

export default class GroupBox extends Component {
  render (){
    const {name,creater_id,id} = this.props
    return (
      <div>
        <ListItem value={id}
          primaryText={name}
          leftAvatar={<Avatar>G</Avatar>}
        />
        <Divider />
      </div>
    )
  }
}
