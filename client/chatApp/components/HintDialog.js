import React, { Component } from "react";
import Dialog from'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

export default class HintDialog extends Component {
   constructor(props) {
     super(props);
     this.state = {
       open: false,
     };
   }

   handleOpen(d){
     this.setState({open: true});
   };

   handleClose(e){
     this.setState({open: false});
   };

   render(){
     const { title,children,handleSubmit } = this.props
     const actions = [
       <FlatButton
       label="取消"
       secondary={true}
       onTouchTap={(e)=>this.handleClose(e)} />,
       <FlatButton
       label="确定"
       primary={true}
       keyboardFocused={true}
       onTouchTap={(e)=>handleSubmit(e)} />,
     ];
     return (
       <div>
         <Dialog
           title={title}
           actions={actions}
           modal={false}
           open={this.state.open}
           onRequestClose={()=>this.handleClose()}
         >
         {children}
         </Dialog>
       </div>
     )
   }

}
