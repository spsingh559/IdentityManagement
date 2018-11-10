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
import EachUserRow from './EachUserRow';

export default class MessageComponent extends React.Component{

    // messageWindowStatus=(data)=>{
    //     this.props.messageWindowStatus(data);
    // }
    add=(name)=>{
        this.props.add(name);
    }
   
    render(){
        console.log('In MessageComp')
        console.log(this.props.chatUserData);

        let newData = this.props.chatUserData.map((data)=>{
            return(
            <EachUserRow
            key={data._id}
             data={data}
             add={this.add}
            />
            )
           });


        return(
            <div style={{marginTop:"20px"}}>
            
              <List>
              {newData}
    
        </List>
                </div>
        )
    }
}