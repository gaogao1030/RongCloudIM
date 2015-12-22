import React, { Component } from "react";
import SignInBox from "../components/SignInBox";
import SignUpBox from "../components/SignUpBox";
import './SignInOrUpPage.scss';

export default class SignInOrUpPage extends Component {
  onSignInClick(e,refs){
    console.log("account:"+refs.accountRef.getValue())
    console.log("passowrd:"+refs.passwordRef.getValue())
    console.log("remember_me:"+refs.rememberMeRef.isChecked())
  }

  onSignUpClick(e,refs){
    console.log(refs);
    refs.passwordConfirmRef.setErrorText("2次密码不一样")
  }

  onSignInTabClick(e){
    this.setState({currentPage: "SignIn"})
  }

  onSignUpTabClick(e){
    this.setState({currentPage: "SignUp"})
  }

  constructor(props){
    super(props);
    this.state = {
      currentPage: "SignIn"
    }
  }

  render (){
    let currentComponent;
    switch( this.state.currentPage ){
    case "SignIn":
      currentComponent = <SignInBox
      accountHintText="请输入帐号"
      passwordHintText = "请输入密码"
      signInButtonLabel = "登录"
      signUpButtonLabel = "注册"
      onSignInClick = {(e,refs) => this.onSignInClick(e,refs)}
      onSignUpTabClick = {(e) => this.onSignUpTabClick(e)}
      onSignInTabClick = {(e) => this.onSignInTabClick(e)} />
      break;
    case "SignUp":
      currentComponent = <SignUpBox
      accountHintText="请输入帐号"
      passwordHintText = "请输入密码"
      nameHintText = "请输入昵称"
      passwordConfirmHintText = "请再次输入密码用来确认"
      signInButtonLabel = "登录"
      signUpButtonLabel = "注册"
      onSignUpClick = {(e,refs) => this.onSignUpClick(e,refs)}
      onSignUpTabClick = {(e) => this.onSignUpTabClick(e)}
      onSignInTabClick = {(e) => this.onSignInTabClick(e)} />
      break;
    }
    return (
      currentComponent
    );
  }
}
