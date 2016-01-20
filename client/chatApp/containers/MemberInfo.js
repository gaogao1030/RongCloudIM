import React, { Component } from "react";
import { getGroupMemberInfo } from '../actions';
import { connect } from 'redux-await';

export default class MemberInfo extends Component {
  componentWillMount(){
    const { dispatch,params } = this.props
    const {group_id,member_id} = params
    dispatch(getGroupMemberInfo(group_id,member_id)).then(()=>
      console.log("yeahhhh!")
    )
  }

  render(){
    debugger
    return (
      <p>hello world</p>
    )
  }
}

function select(state){
  return {
    group_member_info: state.group_member_info
  }
}

export default connect(select)(MemberInfo)
