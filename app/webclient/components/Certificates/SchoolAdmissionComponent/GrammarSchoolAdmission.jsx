import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Grid,Row,Col,Carousel,Panel} from 'react-bootstrap';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

export default class GrammarSchoolAdmission extends React.Component {

    state={
        name:"",
        address:"",
        fatherName:"",
        date:"",
        gender:"",
        grade:""
       }
 
      handleClose = () => this.setState({openDrawer: false});
      handleToggle = () => this.setState({openDrawer: !this.state.openDrawer});

      applyGrammarSchoolAdmission=()=>{
        // alert("registerSuccess");
        // let obj={
        //     _id:Date.now(),
        //     name:this.state.name,
        //     degree:
        //     status
        //     year
        //     average
        //     ssn
        //     dateOfBirth:this.state.date
        // }
       
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
      //onChange = {(event,newValue) => this.setState({name:newValue})}
      floatingLabelText="Name"
      fullWidth={true}
    />
    <br />
    <TextField
      hintStyle={{color:"white"}}
      inputStyle={{color:"white"}}
      floatingLabelStyle={{color:"white"}}
      hintText="Father's name"
      value={this.state.fatherName}
      floatingLabelText="Father's Name"
      fullWidth={true}
    />
    <br />
    <TextField
      hintStyle={{color:"white"}}
      inputStyle={{color:"white"}}
      floatingLabelStyle={{color:"white"}}
      hintText="Address"
      value={this.state.address}
      floatingLabelText="Address"
      fullWidth={true}
    />
    <br />
    <TextField
      hintStyle={{color:"white"}}
      inputStyle={{color:"white"}}
      floatingLabelStyle={{color:"white"}}
      hintText="Gender"
      floatingLabelText="Gender"
      fullWidth={true}
      value={this.state.gender}
    />
    <br />
    <TextField
      hintStyle={{color:"white"}}
      inputStyle={{color:"white"}}
      floatingLabelStyle={{color:"white"}}
      hintText="Date of Birth"
      floatingLabelText="Date of Birth"
      value={this.state.date}
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