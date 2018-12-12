import React from "react";
import Paper from "material-ui/Paper";
import { Col, Row, Grid, Image } from "react-bootstrap";
import Divider from "material-ui/Divider/Divider";
import LinearProgress from "material-ui/LinearProgress";
import { Tabs, Tab } from "material-ui/Tabs";
import ActionHome from "material-ui/svg-icons/hardware/keyboard-arrow-left";
import Content from "material-ui/svg-icons/content/add";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import CircularProgress from "material-ui/CircularProgress";
import Draft from "material-ui/svg-icons/content/drafts";
import Pending from "material-ui/svg-icons/content/report";
import Approved from "material-ui/svg-icons/content/report";
import Axios from "axios";
import restUrl from "../restUrl";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import Send from "material-ui/svg-icons/content/send";
import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import ShowMyAuthServiceDetail from "./ShowMyAuthServiceDetail";
import PendingMyAuthServiceDetail from "./PendingMyAuthServiceDetail";
import ApprovedMyAuthServiceDetail from "./ApprovedMyAuthServiceDetail";

export default class MyAuthService extends React.Component {
  state = {
    serviceData: [],
    open: false,
    certificateData: [],
    responseData: {},
    openDiaglogue: false
  };
  componentDidMount = () => {
    let retrievedUserDetails = JSON.parse(
      sessionStorage.getItem("userLoginDetails")
    );
    // console.log(retrievedUserDetails);
    Axios({
      method: "get",
      url: restUrl + "/api/getAllAuthServiceList/" + retrievedUserDetails.name
    })
      .then(data => {
        console.log("--------------result of get Service----------------");
        console.log(data);
        if (data.data.data.length == 0) {
          console.log("no service available !!");
        } else {
          this.setState({ serviceData: data.data.data });
        }
        // this.setState({onboardingStatus:data.data.data.onboardingStatus})
      })
      .catch(err => {
        alert("Try again Error in fetching record in Services");
      });
  };

  getNow = (_id, obj) => {
    let arr = [];
    console.log("id", _id);
    console.log("obj", obj);
    console.log("data", this.state.serviceData);
    this.state.serviceData.forEach(data => {
      if (data._id == _id) {
        data.userList.push(obj);
        arr = data.userList;
      }
    });
    let updateObj = {
      _id: _id,
      userList: arr
    };
    //   console.log(this.state.serviceData);
    Axios({
      method: "patch",
      url: restUrl + "/api/updateAuthServices",
      data: updateObj
    })
      .then(data => {
        console.log("--------------result of updaing Service ----------------");
        console.log(data);
        if (data.data == "success") {
          alert("successfully updated");
          this.setState({ serviceData: this.state.serviceData });
        } else {
          alert("Error while creating service");
        }
      })
      .catch(err => {
        alert("Try again Error in  fetching record");
      });
  };

  render() {
    // let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));

    return (
      <div
        style={{ marginTop: "90px", minHeight: "600px" }}
        className="homeBackground"
      >
        <div
          style={{
            backgroundColor: "black",
            color: "white",
            height: "40px",
            padding: "0px 5px"
          }}
        >
          <center>
            {" "}
            <h4>
              {" "}
              <span onTouchTap={this.goBack}>
                <ActionHome color="white" style={{ marginRight: "10px" }} />
              </span>
              My Auth Service
            </h4>{" "}
          </center>
        </div>
        <Tabs>
          <Tab icon={<Draft />} label="Requested">
            <Grid>
              <Col xs={12}>
                <ShowMyAuthServiceDetail
                  data={this.state.serviceData}
                  getNow={this.getNow}
                />
              </Col>
            </Grid>
          </Tab>
          <Tab icon={<Pending />} label="Pending">
            <Grid>
              <Col xs={12}>
                <PendingMyAuthServiceDetail
                  data={this.state.serviceData}
                  //genrateResponse={this.genrateResponse}
                />
              </Col>
            </Grid>
          </Tab>
          <Tab icon={<Approved />} label="Approved">
            <Grid>
              <Col xs={12}>
                <ApprovedMyAuthServiceDetail
                  data={this.state.serviceData}
                  //genrateResponse={this.genrateResponse}
                />
              </Col>
            </Grid>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
