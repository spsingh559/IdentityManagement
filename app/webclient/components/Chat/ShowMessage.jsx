import React from 'react';
import EachMessage from './EachMessage';

export default class ShowMessage extends React.Component{

    render(){
        let newData = this.props.data.map((data,index)=>{
            return(
            <EachMessage
            key={index}
             data={data}
            />
            )
           });


        return(
            <div >
              {newData}
                </div>
        )
    }
}