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
import {Row} from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Communication from 'material-ui/svg-icons/communication/message';
{/* <i class="material-icons">keyboard-backspace</i> */}

import MessageComponent from './MessageComponent.jsx';
import ShowMessage from './ShowMessage';

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
  // const chatUserData=[{
  //   _id:"1",
  //   userId:"Navjeet",
  //   imgUrl:"https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAOMAAAAJDU5YjQzMzdjLWQ0NGYtNDdkNi1hYzA3LWQ4YTQ5YzEzOTA5MQ.jpg",
  //   status:"Jindgi Itni Assan n Hai",
  //   recentMessage:"Gins has sent New Message for You!!"

  // },{
  //   _id:"2",
  //   userId:"Pranjul",
  //   imgUrl:"https://media-exp2.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAfGAAAAJDNhYTZjYTY5LTBhOGUtNDUzYS1iMjBhLTk3Nzk3YjVkODkwYQ.jpg",
  //   status:"If Life is Lemon, Squeez It",
  //   recentMessage:" One Message from Someone!!"

  // },{
  //   _id:"3",
  //   userId:"Gins",
  //   imgUrl:"https://scontent.fblr2-1.fna.fbcdn.net/v/t1.0-1/c25.0.100.100/p100x100/13700171_1054027358018701_4686459465728184803_n.jpg?oh=a12a9388dd4453f7b192de25433c775b&oe=5B12F8ED",
  //   status:"A Bai Tum Kya Kar rahe ho??",
  //   recentMessage:"One Message from ready to Mingle!!"

  // },{
  //   _id:"4",
  //   userId:"shyam",
  //   imgUrl:"https://scontent.fblr2-1.fna.fbcdn.net/v/t1.0-1/c27.0.160.160/p160x160/27066953_1497553197033986_2819931860275330955_n.jpg?oh=31daa0f6e6059ece7f4626381b9c3153&oe=5B09D9F3",
  //   status:"Think and Update",
  //   recentMessage:"Fill in the blanks"

  // },{
  //   _id:"5",
  //   userId:"Mammas",
  //   imgUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEQDRjCxHUIrllfk6bpwnLD4dw5-DSw6s4gVwIMa9Fg-ATbP1X",
  //   status:"Single vs Mammas",
  //   recentMessage:"Waiting for 1st Message"
  // }];






export default class Chat extends React.Component{

  state={
    windowStatus:false,
    particularUserData:{},
    message:'',
    messageData:[],
    chatUserData:[],
    open: false,
    userArr:[]
  }
 

  handleClose = () => {
    this.setState({open: false});
  };
  componentDidMount=()=>{
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
  }

  messageWindowStatus=(data)=>{
    let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
    Axios({
      method:'get',
      url:restUrl+'/api/getMessageFrom/'+data.name+'/to'+retrievedUserDetails.name,
    })
    .then((data) => {
      console.log('--------------result of register detail is----------------');
      console.log(data);
      // this.setState({chatUserData:data.data.data})
    
     })
    .catch((err)=>{
      alert('Try again Error in fetching record message')
    })    
this.setState({windowStatus:true,particularUserData:data});

  }

  showUserScreen=()=>{
    this.setState({windowStatus:false});
  }

  sendMessage=()=>{
    let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
    
        var monthName=["Jan", "Feb","March","April","May","Jun","July","Aug","Sept","Oct","Nov","Dec"];
var date=new Date();
var latestDate=date.getDate()+"-"+monthName[date.getMonth()]+"-"+date.getFullYear()+" "+ date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    let obj={
      _id:Date.now(),
      message:this.state.message,
      to:this.state.particularUserData.name,
      from:retrievedUserDetails.name,
      time:latestDate
    }

    let newmessage=this.state.messageData.concat([obj]);
    this.setState({messageData:newmessage,message:''});
    Axios({
      method:'post',
      url:restUrl+'/api/sendMessage',
      data:obj
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
    this.setState({open:true});
  }

  add=(name)=>{
    this.state.userArr.push(name);
    this.setState({userArr:this.state.userArr});
  }

  createChannel=()=>{
    let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
   
    this.state.userArr.forEach((data)=>{
      let channelName;
      if(retrievedUserDetails.role=="US"){
        channelName=retrievedUserDetails.name+'-'+data;
      }else{
        channelName=data+'-'+retrievedUserDetails.name;
  
      }
      let obj={
        channelName:channelName,
        message:[]
      }
      this.AddUserToServer(obj);
      this.setState({open:false});
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
        <MessageComponent chatUserData={this.state.chatUserData} messageWindowStatus={this.messageWindowStatus}/>
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

          return(
            <div style={style.paperStyle2}>
            <List style={{backgroundColor:"#075e54",color:'white'}}>
        <ListItem
        style={{color:"white"}}
          leftAvatar={ <Keyboardbackspace color="white" onTouchTap={this.showUserScreen}/>}
          primaryText={this.state.particularUserData.name}
          rightIcon={<Avatar > 
             {this.state.particularUserData.name.charAt(0).toUpperCase()}
          </Avatar>}
        />
        </List>
        <Row style={style.messageBox}>
            <ShowMessage messageData={this.state.messageData} />
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