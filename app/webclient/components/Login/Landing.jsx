
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

export default class Landing extends React.Component{

    state={
        username:'',
        password:'',
        userContactSignUp:'',
        userEmailSignUp:'',
        userPwdSignUp:'',
        signUpStatus:false,     
          openDrawer:false,
          loginStatus:false,
          registerStatus:false,
          aadhar:'',
          otpWindowStatus:false,
          otp:'',
          registerViewStatus:false,
          jioPassword:'',
          lender:"Lender"
      }

      handleClose = () => this.setState({openDrawer: false});
      handleToggle = () => this.setState({openDrawer: !this.state.openDrawer});
    render(){

        return (
        
       
            <div className="background">
            <AppBar
        title="MyIdentity App"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonTouchTap={this.handleToggle}
      />
    
    
         <Drawer
              docked={false}
              width={200}
              open={this.state.openDrawer}
             
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
          <Link to ="/register">Register</Link>
          </MenuItem>
              
              
            </Drawer>
     
            <Carousel>
      <Carousel.Item >
        <img width="auto" height={500} alt="900x500" src="../images/sovrin1.png" />
        
      </Carousel.Item>
      <Carousel.Item >
        <img width="auto" height={500} alt="900x500" src="../images/sovrin2.png" />
        
      </Carousel.Item>
      <Carousel.Item >
        <img width="auto" height={500} alt="900x500" src="../images/sovrin3.jpg" />
        
      </Carousel.Item>
      <Carousel.Item >
        <img width="auto" height={500} alt="900x500" src="../images/sovrin4.png" />
        
      </Carousel.Item>
    </Carousel>
    <Grid>
      <Row>
      <div className="panel panel-primary" style={{marginTop:"50px"}}>
      <div className="panel-heading">MyIdentity - NextGen Identity Management App</div>
      <div className="panel-body" style={{fontSize:"16"}}>
      MyIdentity is Identity Management based application driven by Blockchain platform Hyperledger Identity. It is initiative of Infosys in providing blockchain capabilities in Identity sector.
      </div>
      <div className="panel-footer" style={{backgroundColor:"blue", color:"white"}}>Read More</div>
    </div>
        </Row>
    </Grid>
    
            </div>
    
            )
    }
}