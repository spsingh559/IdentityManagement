import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Grid,Row,Col,Carousel,Panel} from 'react-bootstrap';
import FlatButton from 'material-ui/FlatButton';

export default class BirthCertificate extends React.Component {

    state={
        name:"kamlendra",
        address:"kamalnathganj",
        fatherName:"kamal",
        date:"13-10-1993",
        gender:"Male"
       }
 
      handleClose = () => this.setState({openDrawer: false});
      handleToggle = () => this.setState({openDrawer: !this.state.openDrawer});

      applySSN=()=>{
        // alert("registerSuccess");
        let obj={
            _id:Date.now(),
            name:this.state.name,
            address:this.state.address,
            fatherName:this.state.fatherName,
            DOB:this.state.date,
            gender:this.state.gender
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
            <div  style={{marginTop:"30px", color:"white"}}>
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
      hintText="Address"
      value={this.state.address}
      floatingLabelText="Address"
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
      floatingLabelText="Date of Birth"
      hintText="Date of Birth"
      value={this.state.date}
      fullWidth={true}
      />
      <br />
    <br />
    <br />
    <RaisedButton style={{borderRadius:'13px'}} label="Submit" primary={true}  onTouchTap={this.applySSN} fullWidth={true}/>
      </div>
      </Grid> 
      </div>
        )
        }
    }