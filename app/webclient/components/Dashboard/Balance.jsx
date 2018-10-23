import React from 'react';
import Paper from 'material-ui/Paper';
import {Col, Row} from 'react-bootstrap';
import Divider from 'material-ui/Divider/Divider';
import LinearProgress from 'material-ui/LinearProgress';
export default class Balance extends React.Component{

    render(){

        let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
    let lenderInfo;
    if(retrievedUserDetails.roleType=="Borrower"){
        return(
            <Paper style={{marginTop:"50px", fontSize:"14pt"}} zDepth={1} >
           
                {/* <Col xs={6} style={{background:"white"}}>
               
                Balance:
                <Divider />
                10,000 Rs
             </Col> */}
            <Col xs={6} style={{background:"white", height:"100px"}}>
               <center>
            <h4>10,000 Jc</h4>

              <LinearProgress mode="indeterminate" />
            <span>  Wallet Balance </span>
              </center>
            
               </Col>
            <Col xs={6} style={{background:"rgb(0, 188, 212)",height:"100px", color:"white"}}>
            <center>
            <h4>
            3
            </h4>
                
            <LinearProgress mode="indeterminate" />
                <span> Active Loan</span>
             </center>
                </Col>
               
                </Paper>
        )
    }else{
        return(
            <Paper style={{marginTop:"50px", fontSize:"14pt"}} zDepth={1} >
           
                {/* <Col xs={6} style={{background:"white"}}>
               
                Balance:
                <Divider />
                10,000 Rs
             </Col> */}
            <Col xs={6} style={{background:"white", height:"100px"}}>
               <center>
            <h4>10,000 Jc</h4>

              <LinearProgress mode="indeterminate" />
            <span>  Wallet Balance </span>
              </center>
            
               </Col>
            <Col xs={6} style={{background:"rgb(0, 188, 212)",height:"100px", color:"white"}}>
            <center>
            <h4>
            1 PPHPD
            </h4>
                
            <LinearProgress mode="indeterminate" />
                <span> Interest Rate</span>
             </center>
                </Col>
               
                </Paper>
        )
    }
        
    }
}