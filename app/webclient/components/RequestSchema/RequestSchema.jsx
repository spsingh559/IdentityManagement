import React from 'react';
import Paper from 'material-ui/Paper';
import {Col, Row, Grid,Image} from 'react-bootstrap';
import Divider from 'material-ui/Divider/Divider';
import LinearProgress from 'material-ui/LinearProgress';
import ActionHome from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import Content from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import Axios from 'axios';
import restUrl from '../restUrl';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Send from 'material-ui/svg-icons/content/send';
import SelectField from 'material-ui/SelectField';
import { Link } from 'react-router';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';

let newArr;
export default class RequestSchema extends React.Component {
  
    state={
      schemaID:'',
      arr:[],
      value:'',
      open: false
    }
    static get contextTypes() {
      return {
        router: React.PropTypes.object.isRequired
      }
    }

    handleClick = () => {
      this.setState({
        open: true,
      });
    };
  
    handleRequestClose = () => {
      this.setState({
        open: false,
      });
    };
  

    componentDidMount=()=>{
      let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
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
        console.log('newArr')
       
      })
      .catch((err)=>{
        alert('Try again Error in fetching record for schema')
      })
    }

    handleChangeRole=(event, index, value) => this.setState({value:value});

    submitSchema=()=>{
      let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
      let obj={
        schemaId:this.state.value,
        name:retrievedUserDetails.name
      }
      
      Axios({
        method:'post',
        url:restUrl+'/api/createSchemaCred',
        data:obj
      })
      .then((data) => {
        console.log('--------------result of creating Schema Cred----------------');
        console.log(data)
        if(data.data=="success"){
          this.setState({open:true,value:''});
        }
        // this.setState({schemaCount:data.data.data.length})
     
       
      })
      .catch((err)=>{
        alert('Try again Error in fetching record for schema')
      })
    }
   
  render() {
    console.log('------inside render---------');
    // let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
    
    
      
      return (
        <div style={{marginTop:"90px",minHeight:"600px"}} className="homeBackground">
        <div style={{backgroundColor:"black", color:"white", height:"40px", padding:"0px 5px"}}>
           <center> <h4> <Link to="/entity"> <ActionHome color="white" style={{marginRight:"10px"}} /></Link>Credential Definition </h4> </center>
     </div>
     <Grid >
     <Col xs={12}>
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
     </Col>
     <br />
     <br />
     <center>
        <RaisedButton
      label="Submit"
      labelPosition="before"
      primary={true}
      onTouchTap={this.submitSchema}
      icon={<Send />}
    />
    </center>
    <Snackbar
          open={this.state.open}
          message="schema Credential successfully created"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
     </Grid>
     </div>
      )

    
      }
  }





