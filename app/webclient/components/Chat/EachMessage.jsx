import React from 'react';
import Chip from 'material-ui/Chip';
import {Row,Col} from 'react-bootstrap';
export default class EachMessage extends React.Component{

    render(){
        let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
        if(this.props.data.from==retrievedUserDetails.name){
            console.log("from");
            return(
                <Col xs={12}>
                <Chip style={{marginTop:"5px",float:"left"}}>
               {this.props.data.message}
             </Chip> 
             </Col>
            )
        }else{
            console.log("to");
            return(
                <Col xs={12}>
           <Chip style={{marginTop:"5px", float: "right"}}>
          {this.props.data.message}
        </Chip> 
        </Col>
            )
        }
       
        
    }
}