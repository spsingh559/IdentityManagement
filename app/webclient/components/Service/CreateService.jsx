import React from 'react';
import {Col, Row, Grid,Image} from 'react-bootstrap';
import ActionHome from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Axios from 'axios';
import restUrl from '../restUrl';
import Send from 'material-ui/svg-icons/content/send';
import Snackbar from 'material-ui/Snackbar';
import Draft from 'material-ui/svg-icons/content/create';
import Inbox from 'material-ui/svg-icons/content/inbox';
import Pending from 'material-ui/svg-icons/content/report';
import {Tabs, Tab} from 'material-ui/Tabs';
export default class CreateService extends React.Component{

    state={
        serviceName:'',
        serviceDescription:'',
        open:false
    }

    submitService=()=>{
      let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
        var monthName=["Jan", "Feb","March","April","May","Jun","July","Aug","Sept","Oct","Nov","Dec"];
var date=new Date();
var latestDate=date.getDate()+"-"+monthName[date.getMonth()]+"-"+date.getFullYear()+" "+ date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        let obj={
            _id:Date.now(),
            owner:retrievedUserDetails.name,
            serviceName:this.state.serviceName,
            serviceDescription:this.state.serviceDescription,
            apiUrl:'/api/get'+this.state.serviceName.toLowerCase(),
            uiRoutes:'/'+this.state.serviceName.toLowerCase(),
            serviceStatus:'Active',
            list:[],
            timeStamp:latestDate
        }

        console.log(obj);

        Axios({
            method:'post',
            url:restUrl+'/api/creatService',
            data:obj
          })
          .then((data) => {
            console.log('--------------result of Create Schema ----------------');
            console.log(data)
            
            if(data.data=='success'){
              this.setState({open:true});
            }else{
              alert('Error while creating service');
            }
            
          })
          .catch((err)=>{
            console.log('catch error')
          })
    }

    handleRequestClose = () => {
        this.setState({
          open: false,
        });
      };

    render(){

        return(
            <div style={{marginTop:"90px",minHeight:"600px"}} className="homeBackground">
            <div style={{backgroundColor:"black", color:"white", height:"40px", padding:"0px 5px"}}>
               <center> <h4> <span onTouchTap={this.goBack}><ActionHome color="white" style={{marginRight:"10px"}} /></span>Manage Services </h4> </center>
         </div>
         <Tabs>
    <Tab
      icon={<Draft />}
      label="Create"
    >
   <Grid >
             <Col xs={12}>
         <TextField
      hintText="Service Name"
      hintStyle={{color:"white"}}
      inputStyle={{color:"white"}}
      floatingLabelStyle={{color:"white"}}
      floatingLabelText="Enter Service  Name"
      onChange = {(event,newValue) => this.setState({serviceName:newValue})}
    />
    <br />
     <TextField
      hintText="Service Description"
      hintStyle={{color:"white"}}
      inputStyle={{color:"white"}}
      floatingLabelStyle={{color:"white"}}
      floatingLabelText="Tell about Service  Offering"
      multiLine={true}
      rows={2}
      rowsMax={4}
      onChange = {(event,newValue) => this.setState({serviceDescription:newValue})}
    />
    <br />
    <center>
        <RaisedButton
      label="Submit"
      labelPosition="before"
      primary={true}
      onTouchTap={this.submitService}
      icon={<Send />}
    />
    </center>
    </Col>
    <Snackbar
          open={this.state.open}
          message={this.state.serviceName +" Service has been created succesfully"}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
             </Grid>
      </Tab>
      <Tab
      icon={<Pending />}
      label="Pending"
    >
    <Grid>
    <Col xs={12}>
    {/* <PendingServiceDetail data={this.state.serviceData} /> */}
    </Col>
    </Grid>
    </Tab>
    <Tab
      icon={<Inbox />}
      label="Issued"
    />
    
  </Tabs>
         
             </div>
        )
    }
   
}