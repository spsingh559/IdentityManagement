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
import EachChannel from './EachChannel';

export default class Channel extends React.Component{

    messageWindowStatus=(_id)=>{
        this.props.messageWindowStatus(_id);
    }
    // add=(name)=>{
    //     this.props.add(name);
    // }
   
    render(){
        console.log('In Channel')
        console.log(this.props.data);

        let newData = this.props.data.map((data,i)=>{
            return(
            <EachChannel
            key={i}
             data={data}
             messageWindowStatus={this.messageWindowStatus}
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