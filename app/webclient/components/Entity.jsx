
import React from 'react';
import { Link } from 'react-router';
import Axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
// import {Grid} from 'react-bootstrap';
import {Grid,Row,Col,Carousel} from 'react-bootstrap';
import Divider from 'material-ui/Divider/Divider';
import restUrl from './restUrl';
import Forward from 'material-ui/svg-icons/content/forward';




export default class Entity extends React.Component {

  state={
    onboardingStatus:'',
    didCount:0,
    schemaCount:0,
    schemacredCount:0
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    }
  }

  componentDidMount=()=>{
    let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
    console.log(retrievedUserDetails);
    Axios({
      method:'get',
      url:restUrl+'/api/onboardingStatus/'+retrievedUserDetails._id,
    })
    .then((data) => {
      console.log('--------------result of onboarding Status----------------');
      console.log(data)
      this.setState({onboardingStatus:data.data.data.onboardingStatus})
    })
    .catch((err)=>{
      alert('Try again Error in fetching record')
    })

    Axios({
      method:'get',
      url:restUrl+'/api/did/'+retrievedUserDetails.name,
    })
    .then((data) => {
      console.log('--------------result of did----------------');
      console.log(data)
      this.setState({didCount:data.data.data.length})
    })
    .catch((err)=>{
      alert('Try again Error in fetching record for DID')
    })

    Axios({
      method:'get',
      url:restUrl+'/api/schemaStatus',
    })
    .then((data) => {
      console.log('--------------result of did----------------');
      console.log(data)
      this.setState({schemaCount:data.data.data.length})
    })
    .catch((err)=>{
      alert('Try again Error in fetching record for schema')
    })

    Axios({
      method:'get',
      url:restUrl+'/api/schemaCred/'+retrievedUserDetails.name,
    })
    .then((data) => {
      console.log('--------------result of schema Cred----------------');
      console.log(data)
      this.setState({schemacredCount:data.data.data.length})
    })
    .catch((err)=>{
      alert('Try again Error in fetching record for schema cred')
    })

  }

  onboarding=()=>{
    if(this.state.onboarding!='Pending'){
      this.context.router.push('/onboarding')
    }else{
      alert('You have already Onboarded');
    }
  }
  
  render() {

    let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
    
      
      return (
       <div style={{marginTop:"60px", minHeight:"600px"}} className="homeBackground">
        <Grid style={{marginTop:"50px"}}>
           
           {/* <Row style={{marginTop:"10px"}}> */}
         
           <Col xs={6} style={{background:"white", height:"100px",marginTop:"50px"}}>
              <center>
           <h3 style={{marginTop:"30px"}}>Wallet Status</h3>
          </center>
           
              </Col>
           <Col xs={6} style={{background:"rgb(0, 188, 212)",height:"100px", color:"white",marginTop:"50px"}}>
           <center>
           <h4>
          {this.state.didCount} DID
           </h4>
               
           <Divider />
               <span> Add New DID</span>
            </center>
               </Col>

               <Col xs={6} style={{background:"white", height:"100px",marginTop:"20px"}}>
              <center>
           <h3 style={{marginTop:"30px"}}>Onboarding Status</h3>
          </center>
           
              </Col>
           <Col xs={6} style={{background:"rgb(0, 188, 212)",height:"100px", color:"white", marginTop:"20px"}} onTouchTap={this.onboarding}>
           <center>
           <h4>
           {this.state.onboardingStatus}
           </h4>
               
           <Divider />
               <span> Start Onboarding
               </span>
               <Forward color="white" >
               </Forward>
              
              
            </center>
               </Col>
{retrievedUserDetails.accessLevel=="A" && retrievedUserDetails.role=="TA"?null:
<div>
               <Col xs={6} style={{background:"white", height:"100px",marginTop:"20px"}}>
              <center>
           <h3 style={{marginTop:"30px"}}>Create Schema</h3>
          </center>
           
              </Col>
           <Col xs={6} style={{background:"rgb(0, 188, 212)",height:"100px", marginTop:"20px",color:"white"}}>
           <center>
           <h4>
           {this.state.schemaCount} Schema 
           </h4>
               
           <Divider />
           <Link to="/createSchema"> Add More </Link>
               {/* <span> Add More</span> */}
            </center>
               </Col>
               </div>
}
               <Col xs={6} style={{background:"white", height:"100px",marginTop:"20px"}}>
              <center>
           <h3 style={{marginTop:"30px"}}>Schema Credential</h3>
          </center>
           
              </Col>
           <Col xs={6} style={{background:"rgb(0, 188, 212)",height:"100px", marginTop:"20px",color:"white"}}>
           <center>
           <h4>
           {this.state.schemacredCount} Schema Cred
           </h4>
               
           <Divider />
           <Link to="/requestSchema"> Add More </Link>
            </center>
               </Col>


               </Grid>
       </div>
      )

    
      }
  }



