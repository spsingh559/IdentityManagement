import React from 'react';
import { Link } from 'react-router';
import Axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {Grid,Row,Col,Carousel,Panel} from 'react-bootstrap';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
// import {Link} from 'react-router';
// import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import {Image} from 'react-bootstrap';
// import Drawer from 'material-ui/Drawer';
// import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Dialog from 'material-ui/Dialog';
import restUrl from '../restUrl';
export default class Registration extends React.Component{

    state={
       name:'',
       phoneNumber:"",
       emailID:"",
       address:"",
       jioPassword:"",
      //  lender:'',
       regData:{}
      }
     
        

      handleClose = () => this.setState({openDrawer: false});
      handleToggle = () => this.setState({openDrawer: !this.state.openDrawer});

    registerSuccess=()=>{
        // alert("registerSuccess");
        let obj={
            _id:Date.now(),
            regId:this.state.lender=="Lender"?"LID"+Date.now():"BID"+Date.now(),
            name:this.state.name,
       phoneNumber:this.state.phoneNumber,
       emailID:this.state.emailID,
       address:this.state.address,
       jioPassword:this.state.jioPassword,
       roleType:this.state.lender
        }
       
        console.log(obj);
        Axios({
            method:'post',
            url:restUrl+'/api/registration',
            data:obj
            })
            .then((data) => {
                console.log(data);
                if(data.data=="success"){
                    this.setState({regData:obj});
                   this.setState({open:true})

                }else{
                    alert('Server Issue, Try Again after some Time')
                }                   
            })
            .catch((error) => {
            console.log(error);
            console.log(error+"error in new Trade");
            });
            
      }

      // radioChange=(e,value)=>{
      //   this.setState({lender:value});
      // }

    render(){

        const actions = [
            <FlatButton
              label="Close"
              primary={true}
              onClick={this.dhandleClose}
            />
          ];

        return(
            <div className="background" style={{height:"auto"}}>
            <AppBar
        title="MyIdentity Registration"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonTouchTap={this.handleToggle}
        />
        
        
         <Drawer
              docked={false}
              width={200}
              open={this.state.openDrawer}
              style={{backgroundColor:"rgb(0, 188, 212)"}}
              onRequestChange={(openDrawer) => this.setState({openDrawer})}
              >
        <center>
            <Image src="../images/Sovrin-logo.jpg" 
            style={{width:'100px',height:'100px'}} circle/>
            </center>
            <Divider />
            <MenuItem onTouchTap={this.handleClose}>
          <Link to ="/login">Login</Link>
          </MenuItem>
          <MenuItem onTouchTap={this.handleClose}>
          <Link to ="/landing">Home</Link>
          </MenuItem>
              
              
            </Drawer>
            <Grid>
              
              
          
            <div  style={{marginTop:"30px", color:"white"}}>
{/*   
  <h4> I want to Register as </h4>
        <RadioButtonGroup name="shipSpeed" defaultSelected={this.state.lender} onChange={this.radioChange}>
      <RadioButton
      labelStyle={{color:"white"}}
        value="Lender"
        label="Lender"
        iconStyle={{color:"white"}}
      />
      
      <RadioButton
       labelStyle={{color:"white"}}
        value="Borrower"
        label="Borrower"
        iconStyle={{color:"white"}}
       />
      </RadioButtonGroup> */}
  
  <div style={{align:"left"}}>
  <TextField
   hintStyle={{color:"white"}}
   inputStyle={{color:"white"}}
   floatingLabelStyle={{color:"white"}}
      hintText=" My Name is"
      onChange = {(event,newValue) => this.setState({name:newValue})}
      floatingLabelText="Name"
      fullWidth={true}
    />
    <br />
    <TextField
   hintStyle={{color:"white"}}
   inputStyle={{color:"white"}}
   floatingLabelStyle={{color:"white"}}
      hintText=" You can call me at"
      onChange = {(event,newValue) => this.setState({phoneNumber:newValue})}
      floatingLabelText="Phone Number"
      fullWidth={true}
    />
    <br />
    <TextField
   hintStyle={{color:"white"}}
   inputStyle={{color:"white"}}
   floatingLabelStyle={{color:"white"}}
      hintText=" My Email Id is"
      onChange = {(event,newValue) => this.setState({emailID:newValue})}
      floatingLabelText="Email Id"
      fullWidth={true}
    />
    <br />
    <TextField
   hintStyle={{color:"white"}}
   inputStyle={{color:"white"}}
   floatingLabelStyle={{color:"white"}}
      hintText="I live in "
      onChange = {(event,newValue) => this.setState({address:newValue})}
      floatingLabelText="Address"
      fullWidth={true}
    />
    <br />
  <TextField
   hintStyle={{color:"white"}}
   inputStyle={{color:"white"}}
   floatingLabelStyle={{color:"white"}}
      hintText=" Set Password"
      onChange = {(event,newValue) => this.setState({jioPassword:newValue})}
      floatingLabelText="Set password"
      fullWidth={true}
    />
    <br />
    <br />
    <RaisedButton style={{borderRadius:'13px'}} label="Submit" primary={true}  onTouchTap={this.registerSuccess} fullWidth={true}/>
    </div> 

      </div>
         
        
          </Grid> 
          </div>
        )
    }
}