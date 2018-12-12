import React from "react";
import { Col, Row, Grid, Image } from "react-bootstrap";
import ActionHome from "material-ui/svg-icons/hardware/keyboard-arrow-left";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import Axios from "axios";
import restUrl from "../restUrl";
import Send from "material-ui/svg-icons/content/send";
import Snackbar from "material-ui/Snackbar";
import Draft from "material-ui/svg-icons/content/create";
import Inbox from "material-ui/svg-icons/content/inbox";
import Pending from "material-ui/svg-icons/content/report";
import { Tabs, Tab } from "material-ui/Tabs";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import Visibility from "material-ui/svg-icons/content/link";
// import VisibilityOff from 'material-ui/svg-icons/content/link_off';

import BrentTAPendingServiceDetail from "./BrentTAPendingServiceDetail";
import BrentTAApproveServiceDetail from "./BrentTAApproveServiceDetail";

const styles = {
  smallIcon: {
    width: 36,
    height: 36
  },
  mediumIcon: {
    width: 48,
    height: 48
  },
  largeIcon: {
    width: 60,
    height: 60
  },
  small: {
    width: 72,
    height: 72,
    padding: 16
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24
  },
  large: {
    width: 120,
    height: 120,
    padding: 30
  }
};
import BrentShowSchema from "./BrentShowSchema.jsx";

export default class BrentCreateService extends React.Component {
  state = {
    schemaName: "",
    version: 0,
    schemaData: [],
    open: false,
    serviceData: []
  };
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }
  componentDidMount = () => {
    let retrievedUserDetails = JSON.parse(
      sessionStorage.getItem("userLoginDetails")
    );
    console.log(retrievedUserDetails);
    Axios({
      method: "get",
      url: restUrl + "/api/getServicesForSteward/" + retrievedUserDetails.name
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
        console.log(err, "Try again Error in fetching record in Services");
      });
    console.log(this.state.serviceData);
  };

  approve = (serviceId, taName) => {
    console.log("entering approved");
    let arr = [];
    console.log(serviceId, taName);
    let updateObj = {
      name: taName,
      status: true
    };
    this.state.serviceData.forEach(data => {
      if (data._id == serviceId) {
        data.userList.forEach((userListData, i) => {
          if (userListData.name == taName) {
            let tmpArr;
            tmpArr = data.userList.splice(i, 1, updateObj);
            tmpArr = null;
            arr = data.userList;
          }
        });
      }
    });
    console.log("updatedarray", arr);
    let updateObject = {
      _id: serviceId,
      userList: arr
    };
    Axios({
      method: "patch",
      url: restUrl + "/api/updateAuthServices",
      data: updateObject
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
  addSchema = e => {
    e.preventDefault();
    let newObj = [{ name: this.state.schemaName }].concat(
      this.state.schemaData
    );
    this.setState({ schemaData: newObj });
    this.setState({ schemaName: " " });
  };

  deleteAttrName = name => {
    console.log(name);
    let dataCurrentState = this.state.schemaData;
    this.state.schemaData.forEach((data, i) => {
      console.log(data);
      if (data.name == name) {
        var editData = dataCurrentState.splice(i, 1);
        editData = null;
      }
    });
    this.setState({ schemaData: dataCurrentState });
  };

  submitSchema = () => {
    let retrievedUserDetails = JSON.parse(
      sessionStorage.getItem("userLoginDetails")
    );
    let schemaAttrArr = [];
    // this.state.schemaData.forEach((data)=>{
    //   schemaAttrArr.push(data.name)
    // });
    // schemaAttrArr.forEach((data)=>{

    // })
    this.state.schemaData.forEach((data, i) => {
      let obj = {
        _id: Date.now(),
        Ownername: retrievedUserDetails.name,
        serviceName: data.name,
        status: "A",
        userList: [
          {
            name: retrievedUserDetails.name,
            status: true
          }
        ]
      };
      this.createService(obj, i, this.state.schemaData.length);
      console.log("each obj is", obj);
    });

    // console.log('obj for auth service list is', obj);
  };

  createService = (obj, i, length) => {
    // console.log(i,length);
    // if(i==length-1){
    //         this.setState({open:true});
    //       }
    Axios({
      method: "post",
      url: restUrl + "/api/creatAuthServiceList",
      data: obj
    })
      .then(data => {
        console.log("--------------result of Create Schema ----------------");
        console.log(data);
        if (data.data == "success") {
          console.log(obj.serviceName + " has been created successfully");
          if (i == length - 1) {
            this.setState({ open: true });
          }

          // this.context.router.push('/entity');
        } else {
          alert("Error while creating schema");
        }
      })
      .catch(err => {
        console.log("catch error");
      });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render() {
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
              Regulate Services{" "}
            </h4>{" "}
          </center>
        </div>
        <Tabs>
          <Tab icon={<Draft />} label="Create">
            <Grid style={{ marginTop: "20 px" }}>
              <Col xs={4}>
                <TextField
                  hintText="Service Field"
                  hintStyle={{ color: "white" }}
                  inputStyle={{ color: "white" }}
                  floatingLabelStyle={{ color: "white" }}
                  floatingLabelText="Enter Auth Service Names"
                  onChange={(event, newValue) =>
                    this.setState({ schemaName: newValue })
                  }
                />
              </Col>
              <Col xs={4} />
              <Col xs={4}>
                <FloatingActionButton mini={true}>
                  <ContentAdd onTouchTap={this.addSchema} />
                </FloatingActionButton>
              </Col>
              <Col xs={12}>
                <div
                  style={{
                    marginTop: "20px",
                    overflowY: "auto",
                    width: "auto",
                    height: "200px"
                  }}
                >
                  <BrentShowSchema
                    data={this.state.schemaData}
                    deleteAttrName={this.deleteAttrName}
                  />
                </div>
              </Col>

              <Col xs={12} style={{ bottom: "0px", position: "absolute" }}>
                <div>
                  <center>
                    <RaisedButton
                      label="Submit"
                      labelPosition="before"
                      primary={true}
                      onTouchTap={this.submitSchema}
                      icon={<Send />}
                    />
                  </center>
                </div>
              </Col>
              <Snackbar
                open={this.state.open}
                message={" Requested Services has been created succesfully"}
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
              />
            </Grid>
          </Tab>
          <Tab icon={<Pending />} label="Await Approval">
            <Grid>
              <Col xs={12}>
                <BrentTAPendingServiceDetail
                  data={this.state.serviceData}
                  approve={this.approve}
                />
              </Col>
            </Grid>
          </Tab>
          <Tab icon={<Inbox />} label="Approved">
            <Grid>
              <Col xs={12}>
                <BrentTAApproveServiceDetail data={this.state.serviceData} />
              </Col>
            </Grid>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
