import React, { Component } from "react";
import Card from "material-ui/lib/card/card";
import Avatar from "material-ui/lib/avatar";
import CardText from "material-ui/lib/card/card-text";
import CardHeader from "material-ui/lib/card/card-header";
import ListItem from 'material-ui/lib/lists/list-item';


export default class MessageBox extends Component {

  render (){
    const { content,className,avatar,name,inversion,style } = this.props;
    return (
      <div style={style}>
        {!inversion &&
        <ListItem
          style={{"display":"inline-block","maxWidth":"80%"}}
          disabled = {true}
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
       }
        {inversion &&
        <ListItem
          style={{"display":"inline-block","maxWidth":"80%","paddingRight":"72px"}}
          disabled = {true}
          rightAvatar={
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
       }
      </div>
    )
  }
}
