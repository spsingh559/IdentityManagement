import React from "react";
import UserData from "./BrentUserData";
export default class EachTAPendingServiceDetail extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  // approve = name => {
  //   this.context.router.push(
  //     this.props.data.uiRoutes +
  //       "/" +
  //       name +
  //       "/" +
  //       this.props.data.CredDefId +
  //       "/" +
  //       this.props.data._id
  //   );
  // };
  approve = name => {
    let serviceId = this.props.data._id;
    this.props.approve(serviceId, name);
  };
  render() {
    let flag = false;
    this.props.data.userList.forEach(data => {
      if (data.status == false) {
        flag = true;
      }
    });

    if (flag) {
      return (
        <div
          className="panel panel-primary"
          style={{ marginTop: "10px", height: "auto" }}
        >
          <div className="panel-heading">{this.props.data.serviceName}</div>
          <div
            className="panel-body"
            style={{ height: "300px", overflowY: "auto" }}
          >
            <UserData data={this.props.data.userList} approve={this.approve} />
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
