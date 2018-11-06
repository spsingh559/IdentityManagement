import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class EachApproveCertificate extends React.Component{

    
   
    render(){
      console.log('data reached to child is');
      console.log(this.props.data);
        return(
            <Card style={{marginTop:"20px"}}>
        <CardHeader
          title={this.props.data.certificateName + "  is issued by "+ this.props.data.issuedBy}
          subtitle={this.props.data.time}
          avatar="../../images/certificate.png"
          actAsExpander={true}
          showExpandableButton={true}
        />
        
       
        <CardText expandable={true}>
         This certificate is issued to <b>{this.props.data.issuedTo+" "} </b>( DID : {" "+ this.props.data.issuedToDID} ) by 
         <b>{" " +this.props.data.issuedBy +" "} </b> (DID : {" "+this.props.data.issuedByDID} ) on <b>{" "+ this.props.data.time} </b> and Certificate Number is<b> {" " +this.props.data._id}</b>
        </CardText>
        <CardActions>
          <FlatButton label="Verify"  />
        </CardActions>
      </Card>
        )
      
    }
   
}