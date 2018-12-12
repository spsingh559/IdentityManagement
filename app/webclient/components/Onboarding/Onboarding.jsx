import React from 'react';
import Paper from 'material-ui/Paper';
import {Col, Row, Grid,Image} from 'react-bootstrap';
import Divider from 'material-ui/Divider/Divider';
import LinearProgress from 'material-ui/LinearProgress';
import ActionHome from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import Content from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import Axios from 'axios';
import restUrl from '../restUrl';






export default class Onboarding extends React.Component {
  
    state = {
        open: false,
        openReq:false
      };
    
      handleOpen = () => {
        this.setState({open: true});
      };
    
      handleClose = () => {
        this.setState({open: false});
      };

      static get contextTypes() {
        return {
          router: React.PropTypes.object.isRequired
        }
      }

    Onboarding=()=>{
        this.setState({open: true});
        // alert('Are you ready');
    }

    handleApprove=()=>{
        this.setState({open:false, openReq:true})
        let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
        let obj={
          entityName:retrievedUserDetails.name
        }
        Axios({
          method:'post',
          url:restUrl+'/api/onboarding/',
          data:obj
        })
        .then((data) => {
          console.log('--------------result of onboarding ----------------');
          console.log(data)
          if(data.data.response=='Success'){
            alert('Onboarded successfully')
            this.context.router.push('/entity');
          }else{
            alert('getting error in onboarding');
          }
          
        })
        .catch((err)=>{
          alert('Try again Error in fetching record')
        })
    }
  render() {

    // let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
    const actions = [
        <FlatButton
          label="Approve"
          primary={true}
          onClick={this.handleApprove}
        />,
        <FlatButton
          label="Reject"
          secondary={true}
          onClick={this.handleClose}
        />,
      ];
    
      
      return (
        <div style={{marginTop:"90px",minHeight:"600px"}} className="homeBackground">
        <div style={{backgroundColor:"black", color:"white", height:"40px", padding:"0px 5px"}}>
           <center> <h4> <span onTouchTap={this.goBack}><ActionHome color="white" style={{marginRight:"10px"}} /></span>Onboarding </h4> </center>
     </div>
     <Grid style={{marginTop:"70px"}}>
     <center>
                      <Image src="../../images/onboarding3.gif"  
                      style={{width:'200px',height:'200px'}} circle onTouchTap={this.Onboarding}/>
                      </center>
                      
     </Grid>
     <Dialog
          title="Consent Form"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          You are going to be part of Trust Anchor provided approval by your known Steward. This relationship is solely based on trust and reputation maintain by your Organisation. Do you want to proceed further?
        </Dialog>

        <Dialog
          title="Request Processing"
          modal={true}
          open={this.state.openReq}
        >
         <br />
         <br />
         Please do not refresh the window, your request is getting process and it may take some time.

         <br />
         <br />
         <center>
         <CircularProgress size={80} thickness={5} />
         </center>
        </Dialog>

     </div>
      )

    
      }
  }



