import React from 'react';
import { Link } from 'react-router';
import Axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {Grid,Row,Col,Carousel,Panel} from 'react-bootstrap';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import {Image} from 'react-bootstrap';
import Divider from 'material-ui/Divider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import restUrl from '../restUrl';


const style = {
  labelStyle: {
      width: 'auto',
      height: '22px',
      family: 'Helvetica',
      size: '18px',
      weight: 'bold',
      style: 'normal',
      stretch: 'normal',
      height: 'normal',
      spacing: 'normal',
      align: 'left',
      color: '#ffffff',
      textTransform: 'lowercase'
     },
     labelStyle1: {
      width: 'auto',
      height: '22px',
      family: 'Helvetica',
      size: '18px',
      marginLeft:"-100px",
      weight: 'bold',
      style: 'normal',
      stretch: 'normal',
      height: 'normal',
      spacing: 'normal',
      align: 'left',
      color: '#ffffff',
      textTransform: 'lowercase'
     },
  buttonBorder:{
    width: '167px',
    height: '48px',
    radius: '6px',
    margin: '8px',
    border: 'solid 1px #ffffff',
    color:'#FFFFFF'
  }
} ;



export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      openDrawer:false
    } 
  }

  
  handleUsername(e){
    this.setState({ username: e.target.value });
  }
  handlePassword(e){
    this.setState({ password: e.target.value });
  }

  handleUserEmailignUp=(e)=>{
    this.setState({userEmailSignUp:e.target.value});
  }

  handlePasswordSignUp=(e)=>{
    this.setState({userPwdSignUp:e.target.value});
  }
  handleUserConatctSignUp=(e)=>{
    this.setState({userContactSignUp:e.target.value});
  }
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    }
  }
  
  

  

  loginClick=()=>{
    let obj={
      name:this.state.username,
      pwd:this.state.password
    }

    console.log('data is', obj);
    console.log('url is ', restUrl);

    Axios({
      method:'post',
      url:restUrl+'/api/login',
      data:obj
    })
    .then((data) => {
     console.log(data)
      
      if(data.data.response=="Succes"){
        sessionStorage.setItem('userLoginDetails',JSON.stringify(data.data));
        if(data.data.role=="US"){
          this.context.router.push('/');
        }else{
          this.context.router.push('/entity')
        }
      }else{
        alert('login Failed');
      }
  
    })
    .catch((error) => {
      console.log(error);
      console.log(error+"error in Login data for post");
    });
   
  }

  navigationLandingPage=()=>{
    this.context.router.push('/landingPage');
  }

  handleClose = () => this.setState({openDrawer: false});
  handleToggle = () => this.setState({openDrawer: !this.state.openDrawer});
 



  render() {
  
     return(
      <div className="background">
      <AppBar
  title="MyIdentity Login"
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
          <Link to ="/landing">Home</Link>
          </MenuItem>
          <MenuItem onTouchTap={this.handleClose}>
          <Link to ="/register">Register</Link>
          </MenuItem>
        
      </Drawer>
       <Grid>
         <Row style={{marginTop: '150px',color:"white"}}>
           <center>
       {/* <h2 style={{marginTop: '150px',color:"white"}}>
       Jio Login 
        </h2><br/> */}
        <TextField
      autoComplete="off"
      hintText="User Name"
      hintStyle={{color:"white"}}
      inputStyle={{color:"white"}}
      floatingLabelStyle={{color:"white"}}
      floatingLabelText="Enter User Name"
      onChange = {(event,newValue) => this.setState({username:newValue})}
    /><br />
    <TextField
    autoComplete="off"
      hintText=" Password"
      inputStyle={{color:"white"}}
      hintStyle={{color:"white"}}
      floatingLabelStyle={{color:"white"}}
      type="password"
      onChange = {(event,newValue) => this.setState({password:newValue})}
      floatingLabelText="Enter Password"
    /><br />
        <div style={{marginTop:"50px"}}>
        <RaisedButton label="Login" primary={true}  onTouchTap={this.loginClick}/>
       
        </div>
        </center>
       </Row>
       
       </Grid> 
       </div>
     )
   
    }
  }