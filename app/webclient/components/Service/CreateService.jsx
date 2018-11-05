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
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TAPendingServiceDetail from './TAPendingServiceDetail';
import TAApproveServiceDetail from './TAApproveServiceDetail';

export default class CreateService extends React.Component{

    state={
        serviceName:'',
        serviceDescription:'',
        open:false,
        serviceData:[],
        value:'',
        arr:[]
    }

    componentDidMount=()=>{
      let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
      console.log(retrievedUserDetails);
      Axios({
          method:'get',
          url:restUrl+'/api/getServicesForOwner/'+retrievedUserDetails.name,
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
          console.log(err,'Try again Error in fetching record in Services')
        })

        Axios({
          method:'get',
          url:restUrl+'/api/schemaStatus',
        })
        .then((data) => {
          console.log('--------------result of did----------------');
          console.log(data)
          // this.setState({schemaCount:data.data.data.length})
        //  this.state.arr=[];
         var self =this;
          data.data.data.forEach((data)=>{
            this.state.arr.push(<MenuItem value={data.schemaId} key={data.schemaId} primaryText={data.schemaName} />)
          })
        })
        .catch((err)=>{
          alert('Try again Error in fetching record for schema')
        })
    
  }

  handleChangeRole=(event, index, value) => this.setState({value:value});

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
            schemaId:this.state.value,
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
    <SelectField 
           hintStyle={{color:"white"}}
           inputStyle={{color:"white"}}
           floatingLabelStyle={{color:"white"}}
           hintText="Select Schema ID"
          floatingLabelText="List of Schema ID"
          value={this.state.value}
          onChange={this.handleChangeRole}
          fullWidth={true}
        >
         {this.state.arr}
        </SelectField>
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
    <TAPendingServiceDetail  data={this.state.serviceData}/>
    </Col>
    </Grid>
    </Tab>
    <Tab
      icon={<Inbox />}
      label="Approved"
    >
    <Grid>
    <Col xs={12}>
    <TAApproveServiceDetail  data={this.state.serviceData}/>
    </Col>
    </Grid>
    </Tab>
    
  </Tabs>
         
             </div>
        )
    }
   
}