import React from 'react';


import EachPendingServiceDetail from './EachPendingServiceDetail';
export default class PendingServiceDetail extends React.Component{

    genrateResponse=(obj)=>{
        this.props.genrateResponse(obj);
    }
   
    render(){
        console.log(this.props.data);

        let newData=this.props.data.map((data,i)=>{
            return(
                <EachPendingServiceDetail
                key={i}
                data={data}
                genrateResponse={this.genrateResponse}
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