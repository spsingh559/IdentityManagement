import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Done from 'material-ui/svg-icons/action/done';
export default class EachChannel extends React.Component{

   

    openChatWindow=()=>{
        this.props.messageWindowStatus(this.props.data._id);
    }
   

    render(){
        console.log(this.props.data);
        let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
        let name;
 if(this.props.data.channelPub==retrievedUserDetails.name){
    name=this.props.data.channelSub
 }else{
     name=this.props.data.channelPub
 }
        return(  
           

            <div>
            <ListItem
            leftAvatar={<Avatar >
                    {name.charAt(0).toUpperCase()}
            </Avatar>}
            primaryText={name}
            
            onTouchTap={this.openChatWindow}
          />
          <Divider inset={true} />
          </div>
  
        )
    
            }   
}