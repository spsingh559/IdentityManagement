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
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import ShowSchema from './ShowSchema.jsx';

const styles = {
    smallIcon: {
      width: 36,
      height: 36,
    },
    mediumIcon: {
      width: 48,
      height: 48,
    },
    largeIcon: {
      width: 60,
      height: 60,
    },
    small: {
      width: 72,
      height: 72,
      padding: 16,
    },
    medium: {
      width: 96,
      height: 96,
      padding: 24,
    },
    large: {
      width: 120,
      height: 120,
      padding: 30,
    },
  };



export default class CreateSchema extends React.Component {
  
    state={
        schemaAttrName:'',
        schemaData:[],
        schemaName:'',
        version:"0.1",
        arr:[],
        value:[]
    }
    static get contextTypes() {
      return {
        router: React.PropTypes.object.isRequired
      }
    }

    componentDidMount=()=>{
      let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
      let status=true;
      Axios({
        method:'get',
        url:restUrl+'/api/getAuthServiceList/'+retrievedUserDetails.name+'/'+status,
      })
      .then((data) => {
        console.log('--------------result of getAuthServiceList----------------');
        console.log(data)
        data.data.data.forEach((datas,i)=>{
          this.state.arr.push(<MenuItem value={datas.serviceName} key={i} primaryText={datas.serviceName + " - Service"} />)
        })
      })
      .catch((err)=>{
        alert('Try again Error in fetching record for schema')
      })
    }

    addSchema=(e)=>{
      e.preventDefault();
        let newObj=[{name:this.state.schemaAttrName}].concat(this.state.schemaData)
        this.setState({schemaData:newObj})
        this.setState({schemaAttrName:" "})
        
    }

    deleteAttrName=(name)=>{
        console.log(name);
        let dataCurrentState=this.state.schemaData;
        this.state.schemaData.forEach((data,i)=>{
            console.log(data);
            if(data.name==name){
                var editData=dataCurrentState.splice(i,1);
             editData=null;
             
            }
        })
        this.setState({schemaData:dataCurrentState})
            
    }

    submitSchema=()=>{
      let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
      let schemaAttrArr=[];
      this.state.schemaData.forEach((data)=>{
        schemaAttrArr.push(data.name)
      });
      let obj={
        schemaName:this.state.value.split(" ").join(""),
        version:this.state.version,
        name:retrievedUserDetails.name,
        schemaAttrName:schemaAttrArr.reverse()
      }
      console.log('obj for schema is', obj);
      Axios({
        method:'post',
        url:restUrl+'/api/creatSchema',
        data:obj
      })
      .then((data) => {
        console.log('--------------result of Create Schema ----------------');
        console.log(data)
        if(data.data=='success'){
          alert(this.state.value + ' Schema has been created successfully');
          this.context.router.push('/entity');
        }else{
          alert('Error while creating schema');
        }
        
      })
      .catch((err)=>{
        console.log('catch error')
      })
    }

    handleChangeRole=(event, index, value) => this.setState({value:value});

  render() {

    // let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
    
    
      
      return (
        <div style={{marginTop:"90px",minHeight:"600px"}} className="homeBackground">
        <div style={{backgroundColor:"black", color:"white", height:"40px", padding:"0px 5px"}}>
           <center> <h4> <span onTouchTap={this.goBack}><ActionHome color="white" style={{marginRight:"10px"}} /></span>Create Schema </h4> </center>
     </div>
     <Grid >
     <Col xs={12}>
     <SelectField 
           hintStyle={{color:"white"}}
           inputStyle={{color:"white"}}
           floatingLabelStyle={{color:"white"}}
           hintText="Select Services"
          floatingLabelText="List of Services"
          value={this.state.value}
          onChange={this.handleChangeRole}
          fullWidth={true}
        >
         {this.state.arr}
        </SelectField>
    </Col>
    <br />
    <Col xs={12}>
     <TextField
      hintText="Version"
      hintStyle={{color:"white"}}
      inputStyle={{color:"white"}}
      floatingLabelStyle={{color:"white"}}
      floatingLabelText="Enter Version  Number"
      onChange = {(event,newValue) => this.setState({version:newValue})}
    />
    </Col>
    <br />
     <Col xs={4}>
     
     <TextField
      hintText="Schema Field"
      hintStyle={{color:"white"}}
      inputStyle={{color:"white"}}
      floatingLabelStyle={{color:"white"}}
      floatingLabelText="Enter Schema Attribute Name"
      onChange = {(event,newValue) => this.setState({schemaAttrName:newValue})}
    />
    </Col>
    <Col xs={4}>
    </Col>
    <Col xs={4}>
    <FloatingActionButton mini={true} >
      <ContentAdd onTouchTap={this.addSchema}/>
    </FloatingActionButton>
    </Col>
    <Col xs={12}>
    <div style={{marginTop:"20px",overflowY:"auto",width:"auto", height:"200px"}}>

    

    <ShowSchema data={this.state.schemaData} deleteAttrName={this.deleteAttrName}/>
    </div>

    </Col>
    
        <Col xs={12} style={{bottom:"60px", position:"absolute"}}>
        <div >
          <center>
        <RaisedButton
      label="Submit"
      labelPosition="before"
      primary={true}
      onTouchTap={this.submitSchema}
      icon={<Send />}
    />
    </center>
    </div>
        </Col>
   
     </Grid>
     </div>
      )

    
      }
  }



