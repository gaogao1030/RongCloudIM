import React, { Component } from "react";
import { connect } from 'react-redux';
import SignInBox from "../components/SignInBox";
import SignUpBox from "../components/SignUpBox";
import { switchComponent, signIn, signUp,setSnackbarInfo } from "../actions/SignInOrUpPage";
import {SWITCH_COMPONENT,SIGN_IN_NOTICE,SIGN_UP_NOTICE} from '../constants/SignInOrUpPage'
import './SignInOrUpPage.scss';

export default class SignInOrUpPage extends Component {
  onSignInClick(e,refs){
    const {dispatch} = this.props
    const account = refs.accountRef.getValue();
    const password = refs.passwordRef.getValue();
    const remember_me = refs.rememberMeRef.isChecked();
    dispatch(signIn(account,password,remember_me));
  }

  onSignUpClick(e,refs){
    const {dispatch} = this.props
    const account = refs.accountRef.getValue();
    const password = refs.passwordRef.getValue();
    const name = refs.nameRef.getValue();
    const password_confirm = refs.passwordConfirmRef.getValue();
    dispatch(signUp(account,password,name,password_confirm));
  }

  onSignInTabClick(e){
    const {dispatch} = this.props
    dispatch(switchComponent("SignInBox"))
    dispatch(setSnackbarInfo(SIGN_UP_NOTICE,"",false,""))
  }

  onSignUpTabClick(e){
    const {dispatch} = this.props
    dispatch(switchComponent("SignUpBox"))
    dispatch(setSnackbarInfo(SIGN_IN_NOTICE,"",false,""))
  }

  componentDidUpdate(){
  }

  componentWillMount(){
    //const {dispatch} = this.props
    //dispatch(setErrorInfo("",false))
  }


  render (){
    let current;
    const {dispatch,currentComponent,signInBox,signUpBox} = this.props
    return (
      <div>
      <SignInBox
      signInBox={signInBox}
      currentComponent = {currentComponent}
      accountHintText="请输入帐号"
      passwordHintText = "请输入密码"
      signInButtonLabel = "登录"
      signUpButtonLabel = "注册"
      onSignInClick = {(e,refs) => this.onSignInClick(e,refs)}
      onSignUpTabClick = {(e) => this.onSignUpTabClick(e)}
      onSignInTabClick = {(e) => this.onSignInTabClick(e)} />
      <SignUpBox
      signUpBox={signUpBox}
      currentComponent = {currentComponent}
      accountHintText="请输入帐号"
      passwordHintText = "请输入密码"
      nameHintText = "请输入昵称"
      passwordConfirmHintText = "请再次输入密码用来确认"
      signInButtonLabel = "登录"
      signUpButtonLabel = "注册"
      onSignUpClick = {(e,refs) => this.onSignUpClick(e,refs)}
      onSignUpTabClick = {(e) => this.onSignUpTabClick(e)}
      onSignInTabClick = {(e) => this.onSignInTabClick(e)} />
      </div>
    )
  }
}

function select(state){
  return {
    currentComponent: state.currentComponent,
    signInBox: state.signInBox,
    signUpBox: state.signUpBox
  }
}

export default connect(select)(SignInOrUpPage)
