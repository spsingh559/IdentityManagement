import React from "react";

import EachMyAuthApprovedServiceDetail from "./EachMyAuthApprovedServiceDetail";
export default class ApprovedMyAuthServiceDetail extends React.Component {
  genrateResponse = obj => {
    this.props.genrateResponse(obj);
  };

  render() {
    console.log(this.props.data);

    let newData = this.props.data.map((data, i) => {
      return (
        <EachMyAuthApprovedServiceDetail
          key={i}
          data={data}
          //genrateResponse={this.genrateResponse}
        />
      );
    });

    return <div>{newData}</div>;
  }
}
