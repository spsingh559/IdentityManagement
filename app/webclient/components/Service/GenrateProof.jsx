import React from 'react';
import {Col, Row, Grid,Image} from 'react-bootstrap';
import ActionHome from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Axios from 'axios';
import restUrl from '../restUrl';
import Send from 'material-ui/svg-icons/content/send';
import Snackbar from 'material-ui/Snackbar';
import Draft from 'material-ui/svg-icons/content/create';
import Inbox from 'material-ui/svg-icons/content/inbox';
import Copyright from 'material-ui/svg-icons/action/copyright';
import IconButton from 'material-ui/IconButton';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
// import Assignment from 'material-ui/svg-icons/content/assignment-ind';
import {Tabs, Tab} from 'material-ui/Tabs';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';
import JSONPretty from 'react-json-pretty';
// import 'react-json-pretty/JSONPretty.monikai.styl' ;
import CopyToClipboard from 'react-copy-to-clipboard';
import ProofData from '../Config/proofRequest';
import { green500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';


export default class GenrateProof extends React.Component{

    state={
        arr:[],
        proofData:[],
        value:'',
        jsonInput:'',
        copied: false,
        // copyView:false
    }
    // handleChangeRole=(event, index, value) => this.setState({value:value});
    componentDidMount=()=>{
        Axios({
            method:'get',
            url:restUrl+'/api/schemaCred',
          })
          .then((data) => {
            console.log('--------------result of did----------------');
            console.log(data)
                //   this.setState({proofData:data.data.data})
                let localArr=[]
            data.data.data.forEach((data)=>{
                localArr.push(data.name+ '-'+ data.CredDefId)
            })
            this.setState({arr:localArr})
          })
          .catch((err)=>{
            alert('Try again Error in fetching record for Cred')
          })
    }

   
    submitProof=()=>{
        let obj={
            _id:Date.now(),
            serviceName:this.props.params.serviceName,
            issuer:this.props.params.owner,
            user:this.props.params.name,
            proof:JSON.parse(this.state.jsonInput),
            response:{}
        }
console.log(obj);
Axios({
    method:'post',
    url:restUrl+'/api/createProof',
    data:obj
  })
  .then((data) => {
    console.log('--------------result of inserting Proof is----------------');
    console.log(data)
        //   this.setState({proofData:data.data.data})
      if(data.data=="success"){
          alert('Proof requested sent to '+ this.props.params.name);
        this.context.router.push('/createService');
      }
  })
  .catch((err)=>{
    alert('Try again, Error in inserting record for Proof')
  })

    }
    handleJsonName=(e)=>{
        e.preventDefault();
        this.setState({jsonInput:e.target.value});
    }
 static get contextTypes() {
        return {
          router: React.PropTypes.object.isRequired
        }
      }
    // formatJson=()=>{
    //     let newJson =JSON.parse(this.state.jsonInput);
    //     this.setState({jsonInput:newJson})
    // }

    // hideCopy=()=>{
    //     this.setState({copyView:true})
    // }
    
    render(){
        console.log(this.props.params.name,this.props.params.serviceName,this.props.params.owner);
        // console.log('ProofData', ProofData);
     let proofName=this.props.params.serviceName.split(" ").join("").toLowerCase();
     console.log(proofName);
     console.log(ProofData);

        return(
            <div style={{marginTop:"90px",minHeight:"600px"}} className="homeBackground">
            <div style={{backgroundColor:"black", color:"white", height:"40px", padding:"0px 5px"}}>
               <center> <h4> <span onTouchTap={this.goBack}><ActionHome color="white" style={{marginRight:"10px"}} /></span>Generate Proof </h4> </center>
         </div>
         <Grid style={{marginTop:"20px"}}>
         <center>
         <h4 style={{color:"white"}}>Credential Detail</h4>
         </center>
        <JSONPretty id="json-pretty" json={this.state.arr}></JSONPretty>
            <br />
            <center>
         <h4 style={{color:"white"}}>Proof Request</h4>
         </center>
         <CopyToClipboard text={JSON.stringify(ProofData[proofName], undefined, 4)} >
          {/* <button>Copy</button> */}
         <FlatButton label="Copy Proof Request" primary={true} />
        
          
        </CopyToClipboard>
        {/* <CopyToClipboard text={JSON.stringify(ProofData[proofName])} >
          <button>Copy</button>
        </CopyToClipboard> */}
        <JSONPretty id="json-pretty1" json={ProofData[proofName]}></JSONPretty>

        <br />
           <textarea className="api_textareaText" value={this.state.jsonInput} onChange={this.handleJsonName} placeholder="Enter Json Here"/>

        <center>
        <RaisedButton
      label="Submit"
      primary={true}
      onTouchTap={this.submitProof}
        />
    </center>
         </Grid>
         
             </div>
        )
    }
   
}