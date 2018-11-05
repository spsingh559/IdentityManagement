import React from 'react';

import EachTAApproveServiceDetail from './EachTAApproveServiceDetail';
export default class TAPendingServiceDetail extends React.Component{

    // getNow=(_id,obj)=>{
    //     this.props.getNow(_id,obj)
    // }
   
    render(){
        console.log('data in TAApprove');
        console.log(this.props.data);

        let newData=this.props.data.map((data,i)=>{
            return(
                <EachTAApproveServiceDetail
                key={i}
                data={data}
                // getNow={this.getNow}
                />
            )
        })

        return(
            <div >
            {newData}
      </div>
        )
    }
   
}