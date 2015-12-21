import React, { Component } from "react";
import TextField from "material-ui/lib/text-field";
import RaisedButton from "material-ui/lib/raised-button";

export default class SignInBox extends Component {
  render (){
    return (
      <div>
        <TextField hintText="请输入帐号"/>
        <TextField style={{display:"block"}}
          hintText="请输入密码"
          type="password"/>
        <RaisedButton label="登录"  />
        <RaisedButton label="注册"  />
      </div>
    );
  }
}
