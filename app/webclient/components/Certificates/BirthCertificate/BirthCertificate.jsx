import React from 'react';
import ActionHome from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import Axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Grid,Row,Col,Carousel,Panel} from 'react-bootstrap';

import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import restUrl from '../../restUrl';

export default class BirthCertificate extends React.Component {


    state={
        name:this.props.params.name,
        address:"",
        fatherName:"",
        motherName:"",
        dob:"",
        POB:"",
        time:"",
        gender:"",
        serviceData:[]
       }

       static get contextTypes() {
        return {
          router: React.PropTypes.object.isRequired
        }
      }
 
      handleChange = (event, date) => { this.setState({ dob: date });};
      handleGenderChange = (event, index, gender) => this.setState({gender});
      handleClose = () => this.setState({openDrawer: false});
      handleToggle = () => this.setState({openDrawer: !this.state.openDrawer});

      componentDidMount=()=>{
        let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));

        Axios({
          method:'get',
          url:restUrl+'/api/getServicesForOwner/'+retrievedUserDetails.name,
          })
          .then((data) => {
              console.log(data);
              if(data.data.data.length==0){
                console.log('no service available !!')
            }else{
                this.setState({serviceData:data.data.data})
            }               
          })
          .catch((error) => {
          console.log(error);
          console.log(error+"error in new Trade");
          });
      }

      applyBirthCert=()=>{
        let arr=[];
        let objList={
          name:this.state.name,
          status:"I"
        }

        let count=0;
          this.state.serviceData.forEach((datas,i)=>{
            if(datas._id==this.props.params.serviceId){
              count=i;
                datas.list.forEach((data,i)=>{
                    if(data.name==this.state.name){
                    
                        var editData=datas.list.splice(i,1,objList);
                        // console.log('editData', editData)
                        editData=null;
                      }
                })
            }
        })
          // console.log('updated service list is', this.state.serviceData);
        let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
        // var monthName=["Jan", "Feb","March","April","May","Jun","July","Aug","Sept","Oct","Nov","Dec"];
        // var date=new Date(this.state.dob);
        // var dob=date.getDate()+monthName[date.getMonth()]+date.getFullYear();
        // var time=new Date(this.state.time);
        //  var birthTime=time.getHours()+time.getMinutes()+time.getSeconds();
        let obj={
            _id:Date.now(),
            certificateData:{
              name:this.state.name,
              fatherName:this.state.fatherName,
              motherName:this.state.motherName,
              gender:this.state.gender,
              dateOfBirth:this.state.dob,
              placeOfBirth:this.state.POB,
              timeOfBirth:this.state.time,
            address:this.state.address           
            },            
            CredDefId:this.props.params.CredDefId,
            issuer:retrievedUserDetails.name,
            serviceId:this.props.params.serviceId,
            list:this.state.serviceData[count].list
        }
       console.log('obj is ');
        console.log(obj);
        Axios({
            method:'post',
            url:restUrl+'/api/birthCertificate',
            data:obj
            })
            .then((data) => {
                console.log(data);
                if(data.data=="success"){
                   alert('Birth Certificate is issued to'+ obj.certificateData.name);
                   this.context.router.push('/entity');
                }else{
                    alert('Server Issue, Try Again after some Time')
                }                   
            })
            .catch((error) => {
            console.log(error);
            console.log(error+"error in new Trade");
            });
            
      }
  
    render() {
      console.log('name is',this.props.params.name)
      console.log('cred id is',this.props.params.CredDefId)
      // let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
      console.log('hi');
        return (
          <div style={{marginTop:"90px",minHeight:"600px"}} className="homeBackground">
          <div style={{backgroundColor:"black", color:"white", height:"40px", padding:"0px 5px"}}>
             <center> <h4> <span onTouchTap={this.goBack}><ActionHome color="white" style={{marginRight:"10px"}} /></span>Create Birth Certificate </h4> </center>
       </div>
            <Grid style={{marginTop:"10px"}}>
  <TextField
      hintStyle={{color:"black"}}
      inputStyle={{color:"black"}}
      floatingLabelStyle={{color:"black"}}
      hintText="Name of applicant"
      value={this.state.name}
      onChange = {(event,newValue) => this.setState({name:newValue})}
      floatingLabelText="Name"
      fullWidth={true}
    />
    <br />
    <TextField
      hintStyle={{color:"black"}}
      inputStyle={{color:"black"}}
      floatingLabelStyle={{color:"black"}}
      hintText="Father's name"
      value={this.state.fatherName}
      onChange = {(event,newValue) => this.setState({fatherName:newValue})}
      floatingLabelText="Father's Name"
      fullWidth={true}
    />
    <br />
    <TextField
      hintStyle={{color:"black"}}
      inputStyle={{color:"black"}}
      floatingLabelStyle={{color:"black"}}
      hintText="Mother's Name"
      value={this.state.motherName}
      onChange = {(event,newValue) => this.setState({motherName:newValue})}
      floatingLabelText="Mother's Name"
      fullWidth={true}
    />
    <br />
    <TextField
      hintStyle={{color:"black"}}
      inputStyle={{color:"black"}}
      floatingLabelStyle={{color:"black"}}
      hintText="Address"
      value={this.state.address}
      onChange = {(event,newValue) => this.setState({address:newValue})}
      floatingLabelText="Address"
      fullWidth={true}
    />
    <br />
  <TextField
      hintStyle={{color:"black"}}
      inputStyle={{color:"black"}}
      floatingLabelStyle={{color:"black"}}
      hintText="Place of Birth"
      value={this.state.POB}
      onChange = {(event,newValue) => this.setState({POB:newValue})}
      floatingLabelText="POB"
      fullWidth={true}
    />
    <br />
    <SelectField
      hintStyle={{color:"black"}}
      inputStyle={{color:"black"}}
      floatingLabelStyle={{color:"black"}}
      hintText="Gender"
      floatingLabelText="Gender"
      fullWidth={true}
      floatingLabelText="Gender"
      value={this.state.gender}
      onChange={this.handleGenderChange}
        >
          <MenuItem value="Male" primaryText="Male" />
          <MenuItem value="Female" primaryText="Female" />
          <MenuItem value="Other" primaryText="Other" />
    </SelectField>
    <br />
    <DatePicker
      hintStyle={{color:"black"}}
      inputStyle={{color:"black"}}
      floatingLabelStyle={{color:"black"}}
      hintText="Date of Birth"
      
      onChange={this.handleChange}
      fullWidth={true}
      />
      <br />
    <TimePicker
      format="24hr"
      hintStyle={{color:"black"}}
      inputStyle={{color:"black"}}
      floatingLabelStyle={{color:"black"}}
      hintText="Time of Birth"
      onChange = {(event,newValue) => this.setState({time:newValue})}
      floatingLabelText="Time"
      fullWidth={true}
    />
    <br />
    <br />
    <RaisedButton style={{borderRadius:'13px'}} label="Submit" primary={true}  onTouchTap={this.applyBirthCert} fullWidth={true}/>
      </Grid> 
      </div>
        )
        }
    }