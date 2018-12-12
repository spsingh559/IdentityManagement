import React from "react";
import { Col, Row, Grid, Image, Table } from "react-bootstrap";

import EachUserData from "./BrentEachUserData";
export default class UserData extends React.Component {
  // getNow=(_id,obj)=>{
  //     this.props.getNow(_id,obj)
  // }

  approve = name => {
    this.props.approve(name);
  };
  render() {
    console.log("data in UserData is a");
    console.log(this.props.data);

    let newData = this.props.data.map((data, i) => {
      return (
        <EachUserData
          key={i}
          data={data}
          i={i}
          approve={this.approve}
          // getNow={this.getNow}
        />
      );
    });

    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th>Approve</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>{newData}</tbody>
      </Table>
    );
  }
}
