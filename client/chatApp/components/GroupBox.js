import React, { Component } from "react";
import ListItem from "material-ui/lib/lists/list-item";
import Avatar from "material-ui/lib/avatar";
import Divider from 'material-ui/lib/divider';

export default class GroupBox extends Component {
  handleOnTouchTap(e,id){
    const {onTouchTap} = this.props
    onTouchTap(e,id)
  }
  render (){
    const {name,creater_id,id} = this.props
    return (
      <div>
        <ListItem value={id}
          primaryText={name}
          leftAvatar={<Avatar>G</Avatar>}
          onTouchTap={(e)=>this.handleOnTouchTap(e,id)}
        />
        <Divider />
      </div>
    )
  }
}
