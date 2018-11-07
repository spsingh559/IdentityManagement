import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Approve from 'material-ui/svg-icons/action/done';
import Delete from 'material-ui/svg-icons/action/delete';
import {Col, Row, Grid,Image} from 'react-bootstrap';
// import UserData from './UserData';
export default class EachTAPendingServiceDetail extends React.Component{

    approve=()=>{
        this.props.approve(this.props.data.name);
    }
   
    render(){

        console.log('data reached to EachApprove');
        console.log(this.props.data);

        // reject=()=>{
        //     alert('reject')
        // }
        if(this.props.data.status!="I"){
            return null;
        }else{
        
        return(

<tr>
      <td>{this.props.i}</td>
      <td>{this.props.data.name}</td>
      <td>{this.props.data.status=="I"?"Approved":null}</td>
      <td>      {this.props.timeStamp}    </td>
     
     
    </tr>
        
        
        )
        }
    }
   
}