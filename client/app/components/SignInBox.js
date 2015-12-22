import React, { Component } from "react";
import TextField from "material-ui/lib/text-field";
import FlatButton from "material-ui/lib/flat-button";
import RaisedButton from "material-ui/lib/raised-button";
import Card from "material-ui/lib/card/card";
import CardActions from "material-ui/lib/card/card-actions";
import CheckBox from "material-ui/lib/checkbox";

export default class SignInBox extends Component {
  onSignInClick(e){
    const refs = {
      accountRef: this.refs.accountInput,
      passwordRef: this.refs.passwordInput,
      rememberMeRef: this.refs.rememberMe
    }
    this.props.onSignInClick(e,refs)
  }
  onSignUpTabClick(e){
    this.props.onSignUpTabClick(e)
  }
  onSignInTabClick(e){
    this.props.onSignInTabClick(e)
  }
  render (){
    return (
      <Card className="signInBox">
        <div className="signInBox-content">
          <CardActions style={{"textAlign":"center"}}>
            <FlatButton label={this.props.signInButtonLabel}
              secondary={true}
              onClick={ (e)=> this.onSignInTabClick(e)}/>
            <FlatButton label={this.props.signUpButtonLabel}
              onClick={ (e)=> this.onSignUpTabClick(e)}/>
          </CardActions>
          <TextField ref="accountInput"
          hintText={this.props.accountHintText}
          fullWidth={true}/>
          <TextField ref="passwordInput" style={{"display":"block"}}
            hintText={this.props.passwordHintText}
            fullWidth={true}
            type="password"/>
          <CardActions>
            <CheckBox ref="rememberMe" name="remember_me" value="remember_me" label="记住我"/>
          </CardActions>
          <CardActions>
            <RaisedButton label={this.props.signInButtonLabel}
              secondary={true}
              fullWidth={true}
              onClick={ (e)=> this.onSignInClick(e)}/>
          </CardActions>
        </div>
      </Card>
    );
  }
}
