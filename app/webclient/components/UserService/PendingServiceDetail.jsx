import React from 'react';


import EachPendingServiceDetail from './EachPendingServiceDetail';
export default class PendingServiceDetail extends React.Component{

    
   
    render(){
        console.log(this.props.data);

        let newData=this.props.data.map((data,i)=>{
            return(
                <EachPendingServiceDetail
                key={i}
                data={data}
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