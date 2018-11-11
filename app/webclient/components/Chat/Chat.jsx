import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Axios from 'axios';
import restUrl from '../restUrl';
import Keyboardbackspace from 'material-ui/svg-icons/hardware/keyboard-backspace';
import Send from 'material-ui/svg-icons/content/send';
import {Grid,Row} from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Communication from 'material-ui/svg-icons/communication/message';
{/* <i class="material-icons">keyboard-backspace</i> */}

import MessageComponent from './MessageComponent.jsx';
import ShowMessage from './ShowMessage';
import Channel from './Channel';

const style={
    paperStyle:{
    width: "auto",
    height: "800px",
    borderRadius: "6px",
    backgroundColor: "#ffffff",
    border: "solid 1px #d5d5d5",
    overflowY:"auto",
    marginTop:"90px"
    },
    paperStyle2:{
      width: "auto",
      height: "500px",
      borderRadius: "6px",
      backgroundColor: "#ffffff",
      border: "solid 1px #d5d5d5",
      overflowY:"auto",
      marginTop:"90px"
      },
   
        headline: {
            fontSize: 24,
            paddingTop: 16,
            marginBottom: 12,
            fontWeight: 400,
          },
          messageBox:{
            width: "320",
            marginLeft:"20px",
            marginTop:"10px",
    height: "350px",
    
    backgroundColor: "#ffffff",
    
    overflowY:"auto"
          },
          messageBoxFooter:{
            marginTop:"10px",
            width: "300px",
            marginLeft:"20px",
            height: "50px",
            borderRadius:"20px",
            backgroundColor: "#ffffff",
            border: "solid 1px #d5d5d5"
          }
    
  }
  const customContentStyle = {
    width: '100%',
    maxWidth: 'none',
  };
  
export default class Chat extends React.Component{

  state={
    windowStatus:false,
    particularUserData:{},
    message:'',
    messageData:[],
    chatUserData:[],
    open: false,
    userArr:[],
    channelData:[]
  }
 

  handleClose = () => {
    this.setState({open: false});
  };
  componentDidMount=()=>{
    let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
    Axios({
      method:'get',
      url:restUrl+'/api/getChannelByPubOrSub/'+retrievedUserDetails.name,
    })
    .then((data) => {
      console.log('--------------result of register detail is----------------');
      console.log(data);
      this.setState({channelData:data.data.data})
    
     })
    .catch((err)=>{
      alert('Try again Error in fetching record for schema')
    })
  }

  messageWindowStatus=(_id)=>{
    console.log(_id);
    // particularUserData
    this.state.channelData.forEach((data)=>{
      if(data._id==_id){
        this.setState({particularUserData:data})
      }
    })
//     let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
//     Axios({
//       method:'get',
//       url:restUrl+'/api/getMessageFrom/'+data.name+'/to'+retrievedUserDetails.name,
//     })
//     .then((data) => {
//       console.log('--------------result of register detail is----------------');
//       console.log(data);
//       // this.setState({chatUserData:data.data.data})
    
//      })
//     .catch((err)=>{
//       alert('Try again Error in fetching record message')
//     })    
this.setState({windowStatus:true});

  }

  showUserScreen=()=>{
    this.setState({windowStatus:false});
  }

  sendMessage=()=>{
    let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
    
        var monthName=["Jan", "Feb","March","April","May","Jun","July","Aug","Sept","Oct","Nov","Dec"];
var date=new Date();
var latestDate=date.getDate()+"-"+monthName[date.getMonth()]+"-"+date.getFullYear()+" "+ date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

        let name;
 if(this.state.particularUserData.channelPub==retrievedUserDetails.name){
    name=this.state.particularUserData.channelSub
 }else{
     name=this.state.particularUserData.channelPub
 }
let obj={
      _id:Date.now(),
      message:this.state.message,
      to:name,
      from:retrievedUserDetails.name,
      time:latestDate
    }
    this.state.particularUserData.message.push(obj);
    this.setState({particularUserData:this.state.particularUserData,message:''});

    // let newmessage=this.state.messageData.concat([obj]);
    // this.setState({messageData:newmessage,message:''});
    Axios({
      method:'patch',
      url:restUrl+'/api/sendMessage',
      data:this.state.particularUserData
    })
    .then((data) => {
      console.log('--------------result of register detail is----------------');
      console.log(data);
      if(data.data="success"){
        console.log('message sent successfully');
      }     
    
     })
    .catch((err)=>{
      alert('Try again Error in sending message')
    })
    
  }

  handleMessage=(e)=>{
    this.setState({message:e.target.value});
  }

  addUser=()=>{
    console.log('clicked');
    let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
    let userType =retrievedUserDetails.role;
    if(userType=="US"){
      userType="TA"
    }else if(userType=="TA"){
      userType="US"
    }

    Axios({
      method:'get',
      url:restUrl+'/api/getUserByUserType/'+userType,
    })
    .then((data) => {
      console.log('--------------result of register detail is----------------');
      console.log(data);
      this.setState({chatUserData:data.data.data})
    //   // this.setState({schemaCount:data.data.data.length})
    // //  this.state.arr=[];
    //  var self =this;
    //   data.data.data.forEach((data)=>{
    //     this.state.arr.push(<MenuItem value={data.schemaId} key={data.schemaId} primaryText={data.schemaName} />)
    //   })
     })
    .catch((err)=>{
      alert('Try again Error in fetching record for schema')
    })
    this.setState({open:true});
  }

  add=(name)=>{
    this.state.userArr.push(name);
    this.setState({userArr:this.state.userArr});
  }

  createChannel=()=>{
    let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
   
    this.state.userArr.forEach((data)=>{
      // let channelName;
      // if(retrievedUserDetails.role=="US"){
      //   channelName=retrievedUserDetails.name+'-'+data;
      // }else{
      //   channelName=data+'-'+retrievedUserDetails.name;
  
      // }
      let obj={
        _id:Date.now()+data,
        channelPub:retrievedUserDetails.name,
        channelSub:data,
        message:[]
      }
      let newData=[obj].concat(this.state.channelData);
      this.AddUserToServer(obj);
      this.setState({open:false,channelData:newData});
    })
    
  

  
  }

  AddUserToServer=(obj)=>{
    Axios({
      method:'post',
      url:restUrl+'/api/createChannel',
      data:obj
    })
    .then((data) => {
      console.log('--------------result of user added to channel----------------');
      console.log(data);
      if(data.data="success"){
        console.log('user added successfully');
      }     
    
     })
    .catch((err)=>{
      alert('Try again Error in sending message')
    })
  }
    render(){
      // console.log('chatUserData ');
      // console.log(chatUserData);
      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleClose}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onClick={this.createChannel}
        />,
      ];
      if(this.state.windowStatus==false){

        return(
            <div style={style.paperStyle}>
            
                <Tabs >
    <Tab label="Chats" style={{backgroundColor:"#075e54",color:'white'}}>
    <FloatingActionButton mini={true} style={{marginTop:"350px", marginLeft:"300px", position:"fixed"}}>
      <Communication color="#075e54" onTouchTap={this.addUser}
      />
    </FloatingActionButton>
   
      <div>
        <Channel data={this.state.channelData} messageWindowStatus={this.messageWindowStatus}/>
      </div>
    </Tab>
    <Tab label="Status" style={{backgroundColor:"#075e54",color:'white'}}>
      <div>
        <h2 style={style.headline}>Status</h2>
        <p>
          This is another example tab.
        </p>
      </div>
    </Tab>
    <Tab label="Calls" style={{backgroundColor:"#075e54",color:'white'}}>
      <div>
        <h2 style={style.headline}>Calls</h2>
        <p>
          This is a third example tab.
        </p>
      </div>
    </Tab>
  </Tabs>
  <Dialog
          title="Add User"
          actions={actions}
          modal={true}
          open={this.state.open}
          contentStyle={customContentStyle}
          onRequestClose={this.handleClose}
          autoScrollBodyConten={true}
        >
           <MessageComponent chatUserData={this.state.chatUserData} add={this.add}/>
        </Dialog>
                </div>
        )}else{

          let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
        let name;
 if(this.state.particularUserData.channelPub==retrievedUserDetails.name){
    name=this.state.particularUserData.channelSub
 }else{
     name=this.state.particularUserData.channelPub
 }
          return(
            <div style={style.paperStyle2}>
            <List style={{backgroundColor:"#075e54",color:'white'}}>
        <ListItem
        style={{color:"white"}}
          leftAvatar={ <Keyboardbackspace color="white" onTouchTap={this.showUserScreen}/>}
          primaryText={name}
          rightIcon={<Avatar > 
             {name.charAt(0).toUpperCase()}
          </Avatar>}
        />
        </List>
        <Row style={style.messageBox}>
            <ShowMessage data={this.state.particularUserData.message} />
          </Row>
          <Row style={style.messageBoxFooter}>
          <center>
          <TextField
      hintText="Message It"
      onChange={this.handleMessage}
      value={this.state.message}
    />
    <Send  onTouchTap={this.sendMessage}/>
    </center>

            </Row>
           
        </div>
        

          )
        }
    }
}