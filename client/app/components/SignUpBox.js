import React, { Component } from "react";
import TextField from "material-ui/lib/text-field";
import FlatButton from "material-ui/lib/flat-button";
import RaisedButton from "material-ui/lib/raised-button";
import Card from "material-ui/lib/card/card";
import CardActions from "material-ui/lib/card/card-actions";
import CheckBox from "material-ui/lib/checkbox";

export default class SignUpBox extends Component {
  onSignUpTabClick(e){
    this.props.onSignUpTabClick(e)
  }
  onSignInTabClick(e){
    this.props.onSignInTabClick(e)
  }
  onSignUpClick(e){
    const refs= {
      accountRef: this.refs.accountInput,
      passwordRef: this.refs.passwordInput,
      nameRef: this.refs.nameInput,
      passwordConfirmRef: this.refs.passwordConfirmInput
    }
    this.props.onSignUpClick(e,refs)
  }

  //life cycle
  componentWillMount(){

  }

  componentDidMount(){

  }

  componentWillReceiveProps(){
  }

  shouldCoponentUpdate(){

  }

  componentWillUpdate(){

  }

  componentDidUpdate(){

  }

  componentWillUnmount(){

  }

  render (){
    return (
      <Card className="signUpBox" style={{
        "display": this.props.currentComponent=="SignUpBox" ? 'block' : 'none'
      }}>
        <div className="signUpBox-content">
          <CardActions style={{"textAlign":"center"}}>
            <FlatButton label= {this.props.signInButtonLabel}
              onClick={ (e)=> this.onSignInTabClick(e)}/>
            <FlatButton label= {this.props.signUpButtonLabel}
              secondary={true}
              onClick={ (e)=> this.onSignUpTabClick(e)}/>
          </CardActions>
          <TextField ref="accountInput"
          hintText={this.props.accountHintText}
          fullWidth={true}/>
          <TextField ref="nameInput"
          hintText={this.props.nameHintText}
          fullWidth={true}/>
          <TextField ref="passwordInput" style={{"display":"block"}}
            hintText={this.props.passwordHintText}
            fullWidth={true}
            type="password"/>
          <TextField ref="passwordConfirmInput" style={{"display":"block"}}
            hintText={this.props.passwordConfirmHintText}
            fullWidth={true}
            type="password"/>
          <CardActions>
            <RaisedButton label={this.props.signUpButtonLabel}
              secondary={true}
              fullWidth={true}
              onClick={ (e)=> this.onSignUpClick(e)}/>
          </CardActions>
        </div>
      </Card>
    );
  }
}
