import React from 'react';
import Paper from 'material-ui/Paper';
import {Col, Row, Grid} from 'react-bootstrap';
import Divider from 'material-ui/Divider/Divider';
import LinearProgress from 'material-ui/LinearProgress';
import ActionHome from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import Content from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class Profile extends React.Component{

    state={
        payViewStatus:false,
        open: false,
    }
    
    
      handleOpen = () => {
        this.setState({open: true});
      };
    
      handleClose = () => {
        this.setState({open: false});
      };

    addMoney=()=>{
        this.setState({payViewStatus:true});
    }

    recharge=()=>{
        this.setState({open: true});
    }
    static get contextTypes() {
        return {
          router: React.PropTypes.object.isRequired
        }
      }

      goBack=()=>{
        let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
        if(retrievedUserDetails.roleType=="Lender"){
        this.context.router.push('/');
        }else if(retrievedUserDetails.roleType=="Borrower"){
            this.context.router.push('/');
        }else if(retrievedUserDetails.roleType=="Auditor"){
            this.context.router.push('/audit');
        }else{
            this.context.router.push('/login');
        }

    }
    
    render(){

        const actions = [
            <FlatButton
              label="Close"
              primary={true}
              onClick={this.handleClose}
            />
          ];

        let payView;
        if(this.state.payViewStatus==true){
            payView=[
                <Col xs={12}>
                <TextField
 
 hintText="Amount"
 floatingLabelText="Enter Amount"
 inputStyle={{color:"white"}}
 hintStyle={{color:"white"}}
 floatingLabelStyle={{color:"white"}}
 onChange = {(event,newValue) => this.setState({amount:newValue})}
/><br />
<TextField
 
 hintText="UPI ID"
 floatingLabelText="Enter UPI ID"
 inputStyle={{color:"white"}}
 hintStyle={{color:"white"}}
 floatingLabelStyle={{color:"white"}}
 onChange = {(event,newValue) => this.setState({upiID:newValue})}
/><br />
<center>
<RaisedButton label="Recharge" primary={true}  onTouchTap={this.recharge}/>
</center>
                    </Col>
            ]
        }else{
            payView=null;
        }

        return(
            <div style={{marginTop:"60px"}} className="homeBackground">
             <div style={{backgroundColor:"black", color:"white", height:"70px", padding:"10px 5px"}}>
                <center> <h3> <span onTouchTap={this.goBack}><ActionHome color="white" style={{marginRight:"10px"}} /></span>My Profile </h3> </center>
          </div>
            <Grid style={{marginTop:"10px"}}>
           
           {/* <Row style={{marginTop:"10px"}}> */}
         
           <Col xs={6} style={{background:"white", height:"100px"}}>
              <center>
           <h4>Suresh Prabhu</h4>
           <Divider />
           <span>  Name </span>
             </center>
           
              </Col>
           <Col xs={6} style={{background:"rgb(0, 188, 212)",height:"100px", color:"white"}}>
           <center>
           <h4>
           8722455007
           </h4>
               
           <Divider />
               <span> Contact Number</span>
            </center>
               </Col>

               {/* </Row>
               
               <Row style={{marginTop:"10px"}}> */}
               <Col xs={6} style={{background:"white", height:"100px", marginTop:"10px"}}>
              <center>
           <h4>Bangalore</h4>
           <Divider />
           <span>  Address </span>
             </center>
           
              </Col>
           <Col xs={6} style={{background:"rgb(0, 188, 212)",height:"100px", color:"white", marginTop:"10px"}}>
           <center>
           <h4>
           10,000 coin
           </h4>
               
           <LinearProgress mode="indeterminate" />
               <span> Wallet Balance</span>
            </center>
               </Col>
                   {/* </Row> */}
              
              <Col xs={12}>
              <div style={{backgroundColor:"black", color:"white", height:"50px", padding:"10px 2px", marginTop:"10px"}}
     onTouchTap={this.addMoney}>
                <center> 
                     <span><Content color="white" style={{marginRight:"10px"}} />
                </span>
                Add Money  </center>
                
          </div>
              </Col>

           {payView}
           
         
       
          
          
           </Grid>
           <Dialog
          title="Payment Processing"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
         Do not refresh, Recharge process is running
        </Dialog>
                </div>
        )
    }
}