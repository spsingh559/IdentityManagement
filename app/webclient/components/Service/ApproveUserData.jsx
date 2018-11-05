import React from 'react';
import {Col, Row, Grid,Image,Table} from 'react-bootstrap';


import EachApproveUserData from './EachApproveUserData';
export default class UserData extends React.Component{

    // getNow=(_id,obj)=>{
    //     this.props.getNow(_id,obj)
    // }
   
    // approve=(name)=>{
    //     this.props.approve(name)
    // }
    render(){
        console.log('data in ApproveUserData is a');
        console.log(this.props.data);

        let newData=this.props.data.map((data,i)=>{
            return(
                <EachApproveUserData
                key={i}
                data={data}
                i={i}
                timeStamp={this.props.timeStamp}
                // approve={this.approve}
                />
            )
        })

        return(
            <Table striped bordered condensed hover>
  <thead>
    <tr>
      <th>#</th>
      <th>User Name</th>
      <th>Status</th>
      <th>Time</th>
    </tr>
  </thead>
  <tbody>
   
      {newData}
    
          </tbody>
          </Table>
        )
    }
   
}