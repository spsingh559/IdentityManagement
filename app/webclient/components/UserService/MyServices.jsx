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
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Send from 'material-ui/svg-icons/content/send';
import Snackbar from 'material-ui/Snackbar';
export default class MyServices extends React.Component{

    componentDidMount=()=>{
        let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
        console.log(retrievedUserDetails);
        let status="Active";
        Axios({
            method:'get',
            url:restUrl+'/api/getServices/'+status,
          })
          .then((data) => {
            console.log('--------------result of onboarding Status----------------');
            console.log(data)
            // this.setState({onboardingStatus:data.data.data.onboardingStatus})
          })
          .catch((err)=>{
            alert('Try again Error in fetching record')
          })
      
    }
    render(){

        return(
            <div style={{marginTop:"90px",minHeight:"600px"}} className="homeBackground">
            <div style={{backgroundColor:"black", color:"white", height:"40px", padding:"0px 5px"}}>
               <center> <h4> <span onTouchTap={this.goBack}><ActionHome color="white" style={{marginRight:"10px"}} /></span>My Services </h4> </center>
         </div>
         <Grid >
             <Col xs={12}>
      </Col>
      </Grid>
      </div>
        )
    }
   
}