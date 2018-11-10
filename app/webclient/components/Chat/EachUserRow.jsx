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
export default class EachUserRow extends React.Component{

    state={
        done:false
    }

    // openChatWindow=()=>{
    //     this.props.messageWindowStatus(this.props.data);
    // }
    add=()=>{
        this.setState({done:true});
        this.props.add(this.props.data.name);
    }

    render(){
        console.log(this.props.data);

        if(this.state.done){
            return(
                <div>
                <ListItem
                leftAvatar={<Avatar >
                        {this.props.data.name.charAt(0).toUpperCase()}
                </Avatar>}
                 rightIcon={<Done />}
                primaryText={this.props.data.name}
                secondaryText={
                  <p>
                   {this.props.data.emailID}
                  </p>
                }
                secondaryTextLines={1}
                onTouchTap={this.add}
              />
              <Divider inset={true} />
              </div>
            )
             } else{
        return(  
           

            <div>
            <ListItem
            leftAvatar={<Avatar >
                    {this.props.data.name.charAt(0).toUpperCase()}
            </Avatar>}
            primaryText={this.props.data.name}
            secondaryText={
              <p>
               {this.props.data.emailID}
              </p>
            }
            secondaryTextLines={1}
            onTouchTap={this.add}
          />
          <Divider inset={true} />
          </div>
  
        )
        }
    }
}