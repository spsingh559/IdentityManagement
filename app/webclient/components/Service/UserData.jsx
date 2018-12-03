import React from 'react';
import {Col, Row, Grid,Image,Table} from 'react-bootstrap';


import EachUserData from './EachUserData';
export default class UserData extends React.Component{

    // getNow=(_id,obj)=>{
    //     this.props.getNow(_id,obj)
    // }
   
    approve=(name)=>{
        this.props.approve(name)
    }

    approveForResponse=(obj,_id)=>{
        this.props.approveForResponse(obj,_id);
    }

    genrateProof=(name)=>{
        this.props.genrateProof(name)
    }
    render(){
        console.log('data in UserData is a ');
        console.log(this.props.data);

        let newData=this.props.data.map((data,i)=>{
            return(
                <EachUserData
                key={i}
                data={data}
                i={i}
                serviceName={this.props.serviceName}
            owner={this.props.owner}
                approve={this.approve}
                genrateProof={this.genrateProof}
                proofReq={this.props.proofReq}
                approveForResponse={this.approveForResponse}
                // getNow={this.getNow}
                />
            )
        })

        return(
            <Table striped bordered condensed hover>
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Approve</th>
      <th>Proof</th>
      <th>Reject</th>
    </tr>
  </thead>
  <tbody>
   
      {newData}
    
          </tbody>
          </Table>
        )
    }
   
}