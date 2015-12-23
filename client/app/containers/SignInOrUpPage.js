import React, { Component } from "react";
import { connect } from 'react-redux';
import SignInBox from "../components/SignInBox";
import SignUpBox from "../components/SignUpBox";
import { switchComponent } from "../actions/SignInOrUpPage";
import './SignInOrUpPage.scss';

export default class SignInOrUpPage extends Component {
  onSignInClick(e,refs){
    //console.log("account:"+refs.accountRef.getValue())
    //console.log("passowrd:"+refs.passwordRef.getValue())
    //console.log("remember_me:"+refs.rememberMeRef.isChecked())
  }

  onSignUpClick(e,refs){
    console.log(refs);
    refs.passwordConfirmRef.setErrorText("2次密码不一样")
  }

  onSignInTabClick(e){
    const {dispatch} = this.props
    dispatch(switchComponent("SignIn"))
    //this.setState({currentPage: "SignIn"})
  }

  onSignUpTabClick(e){
    const {dispatch} = this.props
    dispatch(switchComponent("SignUp"))
    //this.setState({currentPage: "SignUp"})
  }

  //constructor(props){
  //  super(props);
  //  this.state = {
  //    currentPage: "SignIn"
  //  }
  //}

  render (){
    let current;
    const {dispatch,currentComponent} = this.props
    switch( currentComponent ){
    case "SignIn":
      current = <SignInBox
      accountHintText="请输入帐号"
      passwordHintText = "请输入密码"
      signInButtonLabel = "登录"
      signUpButtonLabel = "注册"
      onSignInClick = {(e,refs) => this.onSignInClick(e,refs)}
      onSignUpTabClick = {(e) => this.onSignUpTabClick(e)}
      onSignInTabClick = {(e) => this.onSignInTabClick(e)} />
      break;
    case "SignUp":
      current = <SignUpBox
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
      current
    );
  }
}

function select(state){
  return {
    currentComponent: state.currentComponent
  }
}

export default connect(select)(SignInOrUpPage)
