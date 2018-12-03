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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import JSONPretty from 'react-json-pretty';
import ApproveCertificate from './ApproveCertificate';
const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};
export default class MyServices extends React.Component{

    state={
        serviceData:[],
        open:false,
        certificateData:[],
        responseData:{},
        openDiaglogue:false
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
            alert('Try again Error in  fetching record')
          })


    }

    genrateResponse=(obj)=>{
      let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
      let respObj={
        serviceName:obj.serviceName,
        issuer:obj.issuer,
        user:retrievedUserDetails.name
      }
      Axios({
        method:'post',
        url:restUrl+'/api/getgrammarschoolcertificate',
        data:respObj
      })
      .then((data) => {
        console.log('--------------result of sending response ----------------');
        console.log(data)
        if(data){
          console.log('---------response received -----------');
          // alert('Your wallet has genrated the response')
          this.setState({responseData:data.data.data});
          this.setState({openDiaglogue:true});
            // this.setState({open:true});
            //  this.setState({serviceData:this.state.serviceData})
          }else{
            alert('Error while sending response');
          }
        
      })
      .catch((err)=>{
        alert('Try again Error in sending response')
      })
    }

    handleClose = () => {
      this.setState({openDiaglogue: false});
    };

    submitResponse=()=>{

      Axios({
        method:'patch',
        url:restUrl+'/api/updateProof',
        data:this.state.responseData
      })
      .then((data) => {
        console.log('--------------result of update proof ----------------');
        console.log(data)
        if(data.data=='success'){
          alert('Response submitted')
          this.setState({openDiaglogue:false});
           
        }else{
          alert('Error while creating service');
        }
        
      })
      .catch((err)=>{
        alert('Try again Error in update proof')
      })
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
    <PendingServiceDetail data={this.state.serviceData}
     genrateResponse={this.genrateResponse}
     />
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
      
  <Dialog
      title="Response Genrated"
      actions={actions}
      modal={true}
           open={this.state.openDiaglogue}
           contentStyle={customContentStyle}
      autoScrollBodyContent={true}
    >
    <Grid>
      <JSONPretty id="json-pretty" json={this.state.responseData}></JSONPretty>
      </Grid>
    </Dialog>
      </div>
        )
    }
   
}

 