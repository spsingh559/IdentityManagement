import React from 'react';
import Paper from 'material-ui/Paper';
import {Col, Row} from 'react-bootstrap';
import LinearProgress from 'material-ui/LinearProgress';
import Divider from 'material-ui/Divider/Divider';

export default class Transaction extends React.Component{

    render(){

        return(
            <Paper style={{marginTop:"20px", fontSize:"14pt"}} zDepth={1} >
           
                {/* <Col xs={6} style={{background:"white"}}>
               
                Balance:
                <Divider />
                10,000 Rs
             </Col> */}
            <Col xs={6} style={{background:"white", height:"100px"}}>
               <center>
            <h4>10 </h4>

                <LinearProgress mode="indeterminate" />
            <span>   Confirmed Request</span>
              </center>
            
               </Col>
            <Col xs={6} style={{background:"rgb(0, 188, 212)",height:"100px", color:"white"}}>
            <center>
            <h4>
           2
            </h4>
                
            <LinearProgress mode="indeterminate" />
                <span> Pending Request</span>
             </center>
                </Col>
               
                </Paper>
        )
    }
}