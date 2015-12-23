import React, { Component } from "react";
import { connect } from 'react-redux';
import SignInBox from "../components/SignInBox";
import SignUpBox from "../components/SignUpBox";
import Snackbar from "material-ui/lib/snackbar";
import { switchComponent, signIn } from "../actions/SignInOrUpPage";
import './SignInOrUpPage.scss';

export default class SignInOrUpPage extends Component {
  onSignInClick(e,refs){
    const {dispatch} = this.props
    let account = refs.accountRef.getValue();
    let password = refs.passwordRef.getValue();
    let remember_me = refs.rememberMeRef.isChecked();
    dispatch(signIn(account,password,remember_me))
  }

  onSignUpClick(e,refs){
    console.log(refs);
    refs.passwordConfirmRef.setErrorText("2次密码不一样")
  }

  onSignInTabClick(e){
    const {dispatch} = this.props
    dispatch(switchComponent("SignIn"))
  }

  onSignUpTabClick(e){
    const {dispatch} = this.props
    dispatch(switchComponent("SignUp"))
  }

  componentWillMount(){
    //const {dispatch} = this.props
    //dispatch(setErrorInfo("",false))
  }

  componentDidUpdate(){
    const {isShow} = this.props.signInBox
    if(isShow){
      this.refs.signInBoxSnackbar.show()
    }
  }

  render (){
    let current;
    const {dispatch,currentComponent} = this.props
    switch( currentComponent ){
    case "SignIn":
      const {message,is_show,action} = this.props.signInBox
      current =
      <div>
      <SignInBox
      accountHintText="请输入帐号"
      passwordHintText = "请输入密码"
      signInButtonLabel = "登录"
      signUpButtonLabel = "注册"
      onSignInClick = {(e,refs) => this.onSignInClick(e,refs)}
      onSignUpTabClick = {(e) => this.onSignUpTabClick(e)}
      onSignInTabClick = {(e) => this.onSignInTabClick(e)} />
      <Snackbar
        ref="signInBoxSnackbar"
        message={message}
        action={action}
        isShow={is_show}
      />
      </div>
      break;
    case "SignUp":
      current =
      <div>
      <SignUpBox
      accountHintText="请输入帐号"
      passwordHintText = "请输入密码"
      nameHintText = "请输入昵称"
      passwordConfirmHintText = "请再次输入密码用来确认"
      signInButtonLabel = "登录"
      signUpButtonLabel = "注册"
      onSignUpClick = {(e,refs) => this.onSignUpClick(e,refs)}
      onSignUpTabClick = {(e) => this.onSignUpTabClick(e)}
      onSignInTabClick = {(e) => this.onSignInTabClick(e)} />
      <Snackbar
        message={message}
        action="error"
        openOnMount={isOnMount}
      />
      </div>
      break;
    }
    return (
      current
    );
  }
}

function select(state){
  return {
    currentComponent: state.currentComponent,
    signInBox: state.signInBox
  }
}

export default connect(select)(SignInOrUpPage)
