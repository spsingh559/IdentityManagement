import React from "react";
import Paper from "material-ui/Paper";
import { Col, Row, Grid, Image } from "react-bootstrap";
import Divider from "material-ui/Divider/Divider";
import LinearProgress from "material-ui/LinearProgress";
import ActionHome from "material-ui/svg-icons/hardware/keyboard-arrow-left";
import Content from "material-ui/svg-icons/content/add";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import CircularProgress from "material-ui/CircularProgress";
import Axios from "axios";
import restUrl from "../restUrl";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import Send from "material-ui/svg-icons/content/send";
import Snackbar from "material-ui/Snackbar";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";

export default class EachServiceDetail extends React.Component {
  approve = () => {
    let retrievedUserDetails = JSON.parse(
      sessionStorage.getItem("userLoginDetails")
    );
    let obj = {
      name: retrievedUserDetails.name,
      status: "P"
    };
    this.props.getNow(this.props.data._id, obj);
  };

  render() {
    let retrievedUserDetails = JSON.parse(
      sessionStorage.getItem("userLoginDetails")
    );
    let flag = true;
    this.props.data.list.forEach(data => {
      if (data.name == retrievedUserDetails.name) {
        flag = false;
      }
    });
    console.log("flag", flag);
    if (flag) {
      return (
        <Card style={{ marginTop: "20px" }}>
          <CardHeader
            title={
              this.props.data.serviceName +
              " Request is issued by " +
              this.props.data.owner
            }
            subtitle={this.props.data.timeStamp}
            avatar="../../images/certificate.png"
            actAsExpander={true}
            showExpandableButton={true}
          />

          <CardText expandable={true}>
            {this.props.data.serviceDescription}
            {this.props.data.proofReq ? (
              <p>
                <b>Note : This service Required proof from your credentials</b>
              </p>
            ) : null}
          </CardText>
          <CardActions>
            <FlatButton label="Get Now" onTouchTap={this.approve} />
          </CardActions>
        </Card>
      );
    } else {
      return null;
    }
  }
}
