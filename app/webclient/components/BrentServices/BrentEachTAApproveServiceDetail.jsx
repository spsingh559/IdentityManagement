import React from "react";
import BrentApproveUserData from "./BrentApproveUserData";
export default class BrentEachTAApproveServiceDetail extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }

  // approve=(name)=>{
  //     this.context.router.push(this.props.data.uiRoutes+'/'+name+'/'+this.props.data.CredDefId+'/'+this.props.data._id);
  // }

  render() {
    let flag = false;
    this.props.data.userList.forEach(data => {
      if (data.status == true) {
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
            {/* <UserData data={this.props.data.list} approve={this.approve}/> */}
            <BrentApproveUserData
              data={this.props.data.userList}
              // timeStamp={this.props.data.timeStamp}
            />
          </div>
          {/* <div className="panel-footer">
            {this.props.data.serviceDescription}
          </div> */}
        </div>
      );
    } else {
      return null;
    }
  }
}
