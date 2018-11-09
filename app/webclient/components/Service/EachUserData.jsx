import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Approve from 'material-ui/svg-icons/action/done';
import Proof from 'material-ui/svg-icons/action/assessment';
import Delete from 'material-ui/svg-icons/action/delete';
import {Col, Row, Grid,Image} from 'react-bootstrap';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
// import UserData from './UserData';
export default class EachTAPendingServiceDetail extends React.Component{

    approve=()=>{
        this.props.approve(this.props.data.name);
    }

    genrateProof=()=>{
        this.props.genrateProof(this.props.data.name);
    }
   
    render(){

        

        // reject=()=>{
        //     alert('reject')
        // }
        if(this.props.data.status!="P"){
            return null;
        }else{
        
        return(

<tr>
      <td>{this.props.data.name}</td>
      <td>{this.props.data.status=="P"?"Pending":null}</td>
      <td> <IconButton >
      {/* <Approve onTouchTap={this.approve}/> */}
      <Approve onTouchTap={this.approve} color={greenA200}/>
    </IconButton>
    </td>
      <td>
          {this.props.proofReq?
          <IconButton >
      {/* <Approve onTouchTap={this.approve}/> */}
      <Proof onTouchTap={this.genrateProof} color={blue500} hoverColor={greenA200} />
    </IconButton>:
         
         <IconButton disabled={true}>
         {/* <Approve onTouchTap={this.approve}/> */}
         <Proof onTouchTap={this.genrateProof} color={blue500} hoverColor={greenA200} />
       </IconButton>
          }
        </td>

          <td>
          <IconButton >
      <Delete color={red500}/>
    </IconButton>
    </td>
     
     
    </tr>
        
        
        )
        }
    }
   
}