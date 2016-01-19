import React, { Component } from "react";
import { Link } from 'react-router';

export default class GroupBox extends Component {
  render (){
    const {children} = this.props
    return (
      <div className="content">
        { children }
      </div>
    )
  }
}
