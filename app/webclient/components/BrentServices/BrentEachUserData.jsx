import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import Approve from "material-ui/svg-icons/action/done";
import Delete from "material-ui/svg-icons/action/delete";
import { Col, Row, Grid, Image } from "react-bootstrap";
// import UserData from './UserData';
export default class EachTAPendingServiceDetail extends React.Component {
  approve = () => {
    this.props.approve(this.props.data.name);
  };

  render() {
    // reject=()=>{
    //     alert('reject')
    // }
    if (this.props.data.status != false) {
      return null;
    } else {
      return (
        <tr>
          <td>{this.props.i}</td>
          <td>{this.props.data.name}</td>
          <td>{this.props.data.status == false ? "Pending" : "null"}</td>
          <td>
            <IconButton>
              {/* <Approve onTouchTap={this.approve}/> */}
              <Approve onTouchTap={this.approve} />
            </IconButton>
          </td>

          <td>
            <IconButton>
              <Delete />
            </IconButton>
          </td>
        </tr>
      );
    }
  }
}
