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

let newArr;
export default class RequestSchema extends React.Component {
  
    state={
      schemaID:'',
      arr:[],
      value:''
    }
    static get contextTypes() {
      return {
        router: React.PropTypes.object.isRequired
      }
    }

    componentDidMount=()=>{
      let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
      Axios({
        method:'get',
        url:restUrl+'/api/schemaStatus/'+retrievedUserDetails.name,
      })
      .then((data) => {
        console.log('--------------result of did----------------');
        console.log(data)
        // this.setState({schemaCount:data.data.data.length})
      //  this.state.arr=[];
       var self =this;
       newArr=[];
        data.data.data.forEach((data)=>{
          console.log(data);
          this.state.arr.push(<MenuItem value={data.schemaId} key={data.schemaId} primaryText={data.schemaName} />)
        })
        console.log('newArr')
        console.log(newArr);
      })
      .catch((err)=>{
        alert('Try again Error in fetching record for schema')
      })
    }

    handleChangeRole=(event, index, value) => this.setState({value:value});

    submitSchema=()=>{
      
    }
   
  render() {
    console.log('------inside render---------');
console.log(this.state.arr);
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
     </Grid>
     </div>
      )

    
      }
  }





