import React from "react";

import EachMyAuthPendingServiceDetail from "./EachMyAuthPendingServiceDetail";
export default class PendingMyAuthServiceDetail extends React.Component {
  genrateResponse = obj => {
    this.props.genrateResponse(obj);
  };

  render() {
    console.log(this.props.data);

    let newData = this.props.data.map((data, i) => {
      return (
        <EachMyAuthPendingServiceDetail
          key={i}
          data={data}
          //genrateResponse={this.genrateResponse}
        />
      );
    });

    return <div>{newData}</div>;
  }
}
