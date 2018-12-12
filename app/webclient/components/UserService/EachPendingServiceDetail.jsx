import React from "react";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import { blue500, red500, greenA200 } from "material-ui/styles/colors";
import Proof from "material-ui/svg-icons/action/assessment";
import Delete from "material-ui/svg-icons/action/delete";
import { Col, Row, Grid, Image } from "react-bootstrap";
export default class EachPendingServiceDetail extends React.Component {
  genrateResponse = () => {
    // /api/getgrammarschoolcertificate/serviceName/:serviceName/issuer/:issuer/user/:user
    let obj = {
      serviceName: this.props.data.serviceName,
      issuer: this.props.data.owner
    };
    this.props.genrateResponse(obj);
  };

  render() {
    let retrievedUserDetails = JSON.parse(
      sessionStorage.getItem("userLoginDetails")
    );
    let flag = false;
    this.props.data.list.forEach(data => {
      if (data.name == retrievedUserDetails.name && data.status == "P") {
        flag = true;
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
              this.props.data.owner +
              " and Pending"
            }
            subtitle={this.props.data.timeStamp}
            avatar="../../images/certificate.png"
            actAsExpander={true}
            showExpandableButton={true}
          />

          <CardText expandable={true}>
            {this.props.data.serviceDescription}
          </CardText>

          {/* <CardActions>
        {this.props.data.proofReq? <IconButton >
      <Proof color={blue500} onTouchTap={this.approve}/>
    </IconButton>
       :null}
          <IconButton >
      <Delete color={red500} onTouchTap={this.approve}/>
    </IconButton>
        </CardActions> */}

          <CardActions>
            {/* {this.props.data.proofReq? <FlatButton label="Response" 
        onTouchTap={this.genrateResponse} 
        />
       :null} */}
            <FlatButton label="Withdraw" />
          </CardActions>
        </Card>
      );
    } else {
      return null;
    }
  }
}
