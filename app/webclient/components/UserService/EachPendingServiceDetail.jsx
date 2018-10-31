import React from 'react';
import FlatButton from 'material-ui/FlatButton';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class EachPendingServiceDetail extends React.Component{

    approve=()=>{
        //  let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
        // let obj={
        //     name :retrievedUserDetails.name,
        //     status:"P"
        // }
        // this.props.getNow(this.props.data._id,obj);
    }
   
    render(){
        let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
        let flag=false;
        this.props.data.list.forEach((data)=>{
            if(data.name==retrievedUserDetails.name && data.status=="P"){

                flag=true
            }
        })
        console.log('flag', flag)
        if(flag){
        return(
            <Card style={{marginTop:"20px"}}>
        <CardHeader
          title={this.props.data.serviceName + " Request is issued by "+ this.props.data.owner + " and Pending"}
          subtitle={this.props.data.timeStamp}
          avatar="../../images/certificate.png"
          actAsExpander={true}
          showExpandableButton={true}
        />
        
       
        <CardText expandable={true}>
          {this.props.data.serviceDescription}
        </CardText>
        <CardActions>
          <FlatButton label="Withdraw Request" onTouchTap={this.approve} />
        </CardActions>
      </Card>
        )
        }else{
            return null;
        }
    }
   
}