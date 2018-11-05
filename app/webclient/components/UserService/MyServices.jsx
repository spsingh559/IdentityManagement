import React from 'react';
import {Col, Row, Grid,Image} from 'react-bootstrap';
import ActionHome from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import Axios from 'axios';
import restUrl from '../restUrl';
import {Tabs, Tab} from 'material-ui/Tabs';
import Draft from 'material-ui/svg-icons/content/drafts';
import Inbox from 'material-ui/svg-icons/content/inbox';
import Pending from 'material-ui/svg-icons/content/report';
import ShowServiceDetail from './ShowServiceDetail';
import PendingServiceDetail from './PendingServiceDetail';
import Snackbar from 'material-ui/Snackbar';

import ApproveCertificate from './ApproveCertificate';
export default class MyServices extends React.Component{

    state={
        serviceData:[],
        open:false,
        certificateData:[]
    }

    componentDidMount=()=>{
        let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
        // console.log(retrievedUserDetails);
        Axios({
            method:'get',
            url:restUrl+'/api/getServices',
          })
          .then((data) => {
            console.log('--------------result of get Service----------------');
            console.log(data)
            if(data.data.data.length==0){
                console.log('no service available !!')
            }else{
                this.setState({serviceData:data.data.data})
            }
            // this.setState({onboardingStatus:data.data.data.onboardingStatus})
          })
          .catch((err)=>{
            alert('Try again Error in fetching record in Services')
          })

          Axios({
            method:'get',
            url:restUrl+'/api/getCertificateByUser/'+retrievedUserDetails.name,
          })
          .then((data) => {
            console.log('--------------result of get Certificate----------------');
            console.log(data)
            if(data.data.data.length==0){
                console.log('no service available !!')
            }else{
                this.setState({certificateData:data.data.data})
            }
            // this.setState({onboardingStatus:data.data.data.onboardingStatus})
          })
          .catch((err)=>{
            alert('Try again Error in fetching record in Certificates')
          })
      
    }

    getNow=(_id,obj)=>{
        let arr=[];
          this.state.serviceData.forEach((data)=>{
              if(data._id==_id){
                  data.list.push(obj);
                  arr=data.list;
              }
          })
          let updateObj={
              _id:_id,
              list:arr
          }
        //   console.log(this.state.serviceData);
        Axios({
            method:'patch',
            url:restUrl+'/api/updateServices',
            data:updateObj
          })
          .then((data) => {
            console.log('--------------result of updaing Service ----------------');
            console.log(data)
            if(data.data=='success'){
                this.setState({open:true});
                 this.setState({serviceData:this.state.serviceData})
              }else{
                alert('Error while creating service');
              }
            
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
        
         <Tabs>
    <Tab
      icon={<Draft />}
      label="Requested"
    >
    <Grid>
    <Col xs={12}>
             <ShowServiceDetail data={this.state.serviceData} getNow={this.getNow}/>
      </Col>
      </Grid>
      </Tab>
      <Tab
      icon={<Pending />}
      label="Pending"
    >
    <Grid>
    <Col xs={12}>
    <PendingServiceDetail data={this.state.serviceData} />
    </Col>
    </Grid>
    </Tab>
    <Tab
      icon={<Inbox />}
      label="Issued"
    >
     <Grid>
    <Col xs={12}>
    <ApproveCertificate data={this.state.certificateData} />
    </Col>
    </Grid>
    </Tab>
    
  </Tabs>
  <Snackbar
          open={this.state.open}
          message=" Request process successful !!"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />  
      
      </div>
        )
    }
   
}