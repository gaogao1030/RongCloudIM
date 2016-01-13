import React, { Component } from "react";
import Card from "material-ui/lib/card/card";
import Avatar from "material-ui/lib/avatar";
import CardText from "material-ui/lib/card/card-text";
import CardHeader from "material-ui/lib/card/card-header";
import ListItem from 'material-ui/lib/lists/list-item';


export default class MessageBox extends Component {
  render (){
    const { content,className,avatar,name } = this.props;
    return (
      <ListItem
        className="message"
        disabled = {true}
        style={{"display":"inline-block","maxWidth":"80%"}}
        leftAvatar={
          <Avatar
            style={{"top":"25px"}}
            src={avatar}
          />
        }
      >
      <p>{name}</p>
      <Card className="card">
        <CardText
        style={{"wordBreak":"break-all"}}>
        {content}
        </CardText>
      </Card>
      </ListItem>
    )
  }
}
