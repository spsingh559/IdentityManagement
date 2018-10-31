

import React from 'react';
import { Link } from 'react-router';
import Axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
// import {Grid} from 'react-bootstrap';
import {Grid,Row,Col,Carousel,ProgressBar} from 'react-bootstrap';
import Divider from 'material-ui/Divider/Divider';
import restUrl from './restUrl';
import Forward from 'material-ui/svg-icons/content/forward';







export default class Home extends React.Component {


  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    }
  } 

  routeToService=()=>{
     this.context.router.push('/myServices');
  }

  render() {

    // let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
    
      
      return (
        <div style={{marginTop:"60px", minHeight:"600px"}} className="userbackground">
        <Grid style={{marginTop:"50px"}}>
           
           {/* <Row style={{marginTop:"10px"}}> */}
         
           <Col xs={6} style={{background:"white", height:"100px",marginTop:"50px"}}>
              <center>
           <h3 style={{marginTop:"30px"}}>Wallet </h3>
          </center>
           
              </Col>
           <Col xs={6} style={{background:"rgb(0, 188, 212)",height:"100px", color:"white",marginTop:"50px"}}>
           <center>
           <h4>
         0 DID
           </h4>
               
           <Divider />
               <span> Add New DID</span>
            </center>
               </Col>

               <Col xs={6} style={{background:"white", height:"100px",marginTop:"30px"}}>
              <center>
           <h3 style={{marginTop:"30px"}}>Service Status</h3>
          </center>
           
              </Col>
           <Col xs={6} style={{background:"rgb(0, 188, 212)",height:"100px", color:"white",marginTop:"30px"}}>
           <center>
           <ProgressBar style={{marginTop:"30px", height:"30px"}} onTouchTap={this.routeToService}>
  <ProgressBar striped bsStyle="success"  now={60} key={1} />
  <ProgressBar bsStyle="warning" active now={30} key={2} />
  <ProgressBar active bsStyle="danger" now={10} key={3} />
</ProgressBar>
            </center>
               </Col>
               </Grid>
               </div>
      )

    
      }
  }



