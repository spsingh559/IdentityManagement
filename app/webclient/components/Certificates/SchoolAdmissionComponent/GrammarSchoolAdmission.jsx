import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Grid,Row,Col,Carousel,Panel} from 'react-bootstrap';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ActionHome from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

export default class GrammarSchoolAdmission extends React.Component {

    state={
        name:this.props.params.name,
        degree:"",
        address:"",
        fatherName:"",
        dateofBirth:this.props.params.dateOfBirth,
        grade:"",
        degreeStatus:"Pass",
        year:''
       }
 
     
      handleDegreeChange = (event, index, degreeStatus) => this.setState({degreeStatus});
      applyGrammarSchoolAdmission=()=>{
        // alert("registerSuccess");
        let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
        let obj={
            _id:Date.now(),
            name:this.props.params.name,
            degree:this.state.degree,
            status:this.state.degreeStatus,
            year:this.state.year,
            grade:this.state.grade,
            dateOfBirth:this.props.params.dateOfBirth,
            issuer:retrievedUserDetails.name
        }
       
        console.log(obj);
        // Axios({
        //     method:'post',
        //     url:restUrl+'/api/applySSN',
        //     data:obj
        //     })
        //     .then((data) => {
        //         console.log(data);
        //         if(data.data=="success"){
        //             this.setState({ssnData:obj});
        //            this.setState({open:true})

        //         }else{
        //             alert('Server Issue, Try Again after some Time')
        //         }                   
        //     })
        //     .catch((error) => {
        //     console.log(error);
        //     console.log(error+"error in new Trade");
        //     });
            
      }
  
    render() {
    
       console.log(this.props.params.name, this.props.params.dateOfBirth,this.props.params.serviceId);
        return (
          <div style={{marginTop:"90px",minHeight:"600px"}} className="homeBackground">
          <div style={{backgroundColor:"black", color:"white", height:"40px", padding:"0px 5px"}}>
             <center> <h4> <span onTouchTap={this.goBack}><ActionHome color="white" style={{marginRight:"10px"}} /></span> Grammar School Certificate</h4> </center>
       </div>
       <Grid>
  <TextField
      hintStyle={{color:"white"}}
      inputStyle={{color:"white"}}
      floatingLabelStyle={{color:"white"}}
      hintText="Name of applicant"
      value={this.state.name}
      disabled={true}
      //onChange = {(event,newValue) => this.setState({name:newValue})}
      floatingLabelText="Name"
      fullWidth={true}
    />
    <br />
    <TextField
      hintStyle={{color:"white"}}
      inputStyle={{color:"white"}}
      floatingLabelStyle={{color:"white"}}
      hintText="Degree Name"
      floatingLabelText="Name of Degree"
      value={this.state.degree}
      onChange = {(event,newValue) => this.setState({degree:newValue})}
      fullWidth={true}
      />
      <br />
      <SelectField
      hintStyle={{color:"black"}}
      inputStyle={{color:"black"}}
      floatingLabelStyle={{color:"black"}}
      hintText="Degree Status"
      fullWidth={true}
      floatingLabelText="Pass or Fail"
      value={this.state.degreeStatus}
      onChange={this.handleDegreeChange}
        >
          <MenuItem value="Pass" primaryText="Pass" />
          <MenuItem value="Fail" primaryText="Fail" />
          <MenuItem value="Other" primaryText="Other" />
    </SelectField>
    <br />
  
    <TextField
      hintStyle={{color:"white"}}
      inputStyle={{color:"white"}}
      floatingLabelStyle={{color:"white"}}
      hintText="Date of Birth"
      floatingLabelText="Date of Birth"
      value={this.state.dateofBirth}
      disabled={true}
      fullWidth={true}
      />
      <br />
      <TextField
      hintStyle={{color:"white"}}
      inputStyle={{color:"white"}}
      floatingLabelStyle={{color:"white"}}
      hintText="Primary School Grade"
      floatingLabelText="Primary School Grade"
      value={this.state.grade}
      onChange = {(event,newValue) => this.setState({grade:newValue})}
      fullWidth={true}
      />
      <br />
      <TextField
      hintStyle={{color:"white"}}
      inputStyle={{color:"white"}}
      floatingLabelStyle={{color:"white"}}
      hintText="Year"
      floatingLabelText="Time Duration"
      value={this.state.year}
      onChange = {(event,newValue) => this.setState({year:newValue})}
      fullWidth={true}
      />
      <br />
    <br />
    <br />
    <RaisedButton style={{borderRadius:'13px'}} label="Submit" primary={true}  onTouchTap={this.applyGrammarSchoolAdmission} fullWidth={true}/>
      </Grid> 
      </div>
        )
        }
    }