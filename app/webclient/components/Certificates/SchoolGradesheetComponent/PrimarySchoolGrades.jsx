import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Grid,Row,Col,Carousel,Panel} from 'react-bootstrap';
import FlatButton from 'material-ui/FlatButton';

export default class PrimarySchoolAdmission extends React.Component {

    state={
        name:"kamlendra",
        fatherName:"kamal",
        date:"13-10-1993",
        gender:"male",
        grade:"A+"
       }
 
      handleClose = () => this.setState({openDrawer: false});
      handleToggle = () => this.setState({openDrawer: !this.state.openDrawer});

      applyPrimarySchoolAdmission=()=>{
        // alert("registerSuccess");
        let obj={
            _id:Date.now(),
            name:this.state.name,
            fatherName:this.state.fatherName,
            DOB:this.state.date,
            gender:this.state.gender,
            grade:this.state.grade
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
        const actions = [
            <FlatButton
              label="Close"
              primary={true}
              onClick={this.dhandleClose}
            />
          ];
        return (
            <div className="background" style={{height:"auto"}}>
            <Grid>
            <div  style={{marginTop:"50px", color:"white"}}>
  <TextField
      hintStyle={{color:"black"}}
      inputStyle={{color:"black"}}
      floatingLabelStyle={{color:"black"}}
      hintText="Name of applicant"
      value={this.state.name}
      //onChange = {(event,newValue) => this.setState({name:newValue})}
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
      floatingLabelText="Father's Name"
      fullWidth={true}
    />
    <br />
    <TextField
      hintStyle={{color:"black"}}
      inputStyle={{color:"black"}}
      floatingLabelStyle={{color:"black"}}
      hintText="Gender"
      floatingLabelText="Gender"
      fullWidth={true}
      value={this.state.gender}
    />
    <br />
    <TextField
      hintStyle={{color:"black"}}
      inputStyle={{color:"black"}}
      floatingLabelStyle={{color:"black"}}
      hintText="Date of Birth"
      floatingLabelText="Date of Birth"
      value={this.state.date}
      fullWidth={true}
      />
      <br />
      <TextField
      hintStyle={{color:"black"}}
      inputStyle={{color:"black"}}
      floatingLabelStyle={{color:"black"}}
      hintText="Primary School Grade"
      floatingLabelText="Primary School Grade"
      value={this.state.grade}
      fullWidth={true}
      />
      <br />
    <br />
    <RaisedButton style={{borderRadius:'13px'}} label="Submit" primary={true}  onTouchTap={this.applyPrimarySchoolAdmission} fullWidth={true}/>
      </div>
      </Grid> 
      </div>
        )
        }
    }