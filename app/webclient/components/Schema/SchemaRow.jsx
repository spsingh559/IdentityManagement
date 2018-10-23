import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';
import SvgIconFace from 'material-ui/svg-icons/action/face';
import {blue300, indigo900} from 'material-ui/styles/colors';



export default class SchemaRow extends React.Component{


     handleRequestDelete=() =>{
       
        this.props.deleteAttrName(this.props.data.name);
      }
   render(){

    

    return(
        <div style={{marginTop:"10px"}}>
        <Chip
         onRequestDelete={this.handleRequestDelete}
          
        >
          {this.props.data.name}
        </Chip>
        </div>
    )
   }
}