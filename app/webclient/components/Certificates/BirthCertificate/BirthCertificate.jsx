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
        gender:""
       }
 
      handleChange = (event, date) => { this.setState({ dob: date });};
      handleGenderChange = (event, index, gender) => this.setState({gender});
      handleClose = () => this.setState({openDrawer: false});
      handleToggle = () => this.setState({openDrawer: !this.state.openDrawer});

      applyBirthCert=()=>{
        let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
        let obj={
            _id:Date.now(),
            certificateData:{
              name:this.state.name,
            address:this.state.address,
            fatherName:this.state.fatherName,
            motherName:this.state.motherName,
            DOB:this.state.dob,
            POB:this.state.POB,
            time:this.state.time,
            gender:this.state.gender,
            },            
            CredDefId:this.props.params.CredDefId,
            issuer:retrievedUserDetails.name
        }
       console.log('obj is');
        console.log(obj);
        Axios({
            method:'post',
            url:restUrl+'/api/birthCertificate',
            data:obj
            })
            .then((data) => {
                console.log(data);
                // if(data.data=="success"){
                //     this.setState({birthData:obj});
                //    this.setState({open:true})

                // }else{
                //     alert('Server Issue, Try Again after some Time')
                // }                   
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