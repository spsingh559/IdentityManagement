import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Grid,Row,Col,Carousel,Panel} from 'react-bootstrap';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ActionHome from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import { Divider } from 'material-ui';
import Axios from 'axios';
import restUrl from '../../restUrl';
export default class GrammarSchoolAdmission extends React.Component {

    state={
        name:this.props.params.name,
        degree:"",
        address:"",
        fatherName:"",
        dateofBirth:this.props.params.dateOfBirth,
        grade:"",
        degreeStatus:"Pass",
        year:'',
        arr:[],
        serviceData:[]
       }

       componentDidMount=()=>{
        let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
        Axios({
            method:'get',
            url:restUrl+'/api/schemaCred/'+retrievedUserDetails.name,
          })
          .then((data) => {
            console.log('--------------result of did----------------');
            console.log(data)
                //   this.setState({proofData:data.data.data})
                
                data.data.data.forEach((data)=>{
                  this.state.arr.push(<MenuItem value={data.CredDefId} key={data.schemaId} primaryText={data.schemaId} />)
                })
          })
          .catch((err)=>{
            alert('Try again Error in fetching record for Cred')
          })

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
    
    static get contextTypes() {
      return {
        router: React.PropTypes.object.isRequired
      }
    }
 
     
      handleDegreeChange = (event, index, degreeStatus) => this.setState({degreeStatus});
      handleChangeRole=(event, index, value) => this.setState({value:value});
      applyGrammarSchoolAdmission=()=>{

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
        let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
        // 'year', 'degree', 'name', 'dateOfBirth', 'grade', 'status'
        let obj={
            _id:Date.now(),
            certificateData:{
            name:this.props.params.name,
            degree:this.state.degree,
            status:this.state.degreeStatus,
            year:this.state.year,
            grade:this.state.grade,
            dateOfBirth:this.props.params.dateOfBirth,          
            },            
            CredDefId:this.state.value,
            issuer:retrievedUserDetails.name,
            serviceId:this.props.params.serviceId,
            list:this.state.serviceData[count].list
        }
       console.log('obj is ');
        console.log(obj);
        console.log('calling to server');
        Axios({
            method:'post',
            url:restUrl+'/api/genrateGrammarSchoolCertificate',
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
    
       console.log(this.props.params.name, this.props.params.dateOfBirth,this.props.params.serviceId);
        return (
          <div style={{marginTop:"90px",minHeight:"600px"}} className="homeBackground">
          <div style={{backgroundColor:"black", color:"white", height:"40px", padding:"0px 5px"}}>
             <center> <h4> <span onTouchTap={this.goBack}><ActionHome color="white" style={{marginRight:"10px"}} /></span> Grammar School Certificate</h4> </center>
       </div>
       <Grid>
       <SelectField 
           hintStyle={{color:"white"}}
           inputStyle={{color:"white"}}
           floatingLabelStyle={{color:"white"}}
           hintText="Select Schema"
          floatingLabelText="List of Schema ID"
          value={this.state.value}
          onChange={this.handleChangeRole}
          fullWidth={true}
        >
         {this.state.arr}
        </SelectField>
        <br />
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