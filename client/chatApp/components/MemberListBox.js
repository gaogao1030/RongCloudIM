import React, { Component } from "react";
import List from 'material-ui/lib/lists/list';
import MemberBox from './MemberBox';
import Divider from 'material-ui/lib/divider';

const me_condition=function(me,member) {
  if(me.id === member.id){
    return true
  } else {
    return false
  }
}

const creater_condition=function(creater,member){
  if(creater.id === member.id){
    return true
  } else {
    return false
  }
}

export default class MemberListBox extends Component {
  render(){
    const { members, my_info,group_info } = this.props
    return (
      <div>
        <List style={{"paddingBottom":"0","paddingTop":"0"}}>
          {members.map((member,index)=>
            <MemberBox {...member}
              is_me={me_condition(my_info,member)}
              is_creater={creater_condition({id:Number(group_info.creater_id)},member)}
              key={index}
            />
          )}
        </List>
        <Divider />
      </div>
    )
  }
}
