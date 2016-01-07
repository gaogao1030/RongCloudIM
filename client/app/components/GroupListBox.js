import React, { Component } from "react";
import List from "material-ui/lib/lists/list";
import Divider from 'material-ui/lib/divider';
import GroupBox from "./GroupBox";

export default class GroupListBox extends Component {
  render (){
    const { groups } = this.props
    return (
      <div>
      <List style={{"paddingBottom":"0","paddingTop":"0"}}>
        {groups.map((group,index)=>
          <GroupBox
            key={index}
          />
        )}
      </List>
      <Divider />
      </div>
    )
  }
}
