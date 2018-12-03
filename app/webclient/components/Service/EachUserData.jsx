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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import JSONPretty from 'react-json-pretty';
import Axios from 'axios';
import restUrl from '../restUrl';
const customContentStyle = {
    width: '100%',
    maxWidth: 'none',
  };
export default class EachTAPendingServiceDetail extends React.Component{

    state={
        openDiaglogue:false,
        respData:{}
    }
    approve=()=>{
        if(this.props.proofReq){
            
            let obj={
                serviceName: this.props.serviceName,
                issuer:this.props.owner,
                user: this.props.data.name
            }
            Axios({
                method:'post',
                url:restUrl+'/api/getProof',
                data:obj
              })
              .then((data) => {
                console.log('--------------result of updaing Service ----------------');
                console.log(data)
                
                this.setState({respData:data.data.data})
                this.setState({openDiaglogue:true})
              })
              .catch((err)=>{
                alert('Try again Error in  fetching record')
              })
            
        }else{
        this.props.approve(this.props.data.name);
        }
    }

    genrateProof=()=>{
        this.props.genrateProof(this.props.data.name);
    }
    handleClose = () => {
        this.setState({openDiaglogue: false});
      };

      submitResponse=()=>{
        let obj={
          name:this.state.respData.response.requested_proof.revealed_attrs.attr1_referent.raw,
          dateOfBirth:this.state.respData.response.requested_proof.revealed_attrs.attr2_referent.raw
        }
        console.log(this.state.respData.response.requested_proof.revealed_attrs.attr1_referent.raw)
        console.log(this.state.respData.response.requested_proof.revealed_attrs.attr2_referent.raw)
        this.props.approveForResponse(obj, this.state.respData._id);
      }
    render(){
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              onClick={this.submitResponse}
            />,
          ];
        

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
    <Dialog
      title={"Response sent by " + this.props.data.name}
      actions={actions}
      modal={true}
           open={this.state.openDiaglogue}
           contentStyle={customContentStyle}
      autoScrollBodyContent={true}
    >
    <Grid>
      <JSONPretty id="json-pretty" json={this.state.respData}></JSONPretty>
      </Grid>
    </Dialog>
     
    </tr>
        
        
        )
        }
    }
   
}