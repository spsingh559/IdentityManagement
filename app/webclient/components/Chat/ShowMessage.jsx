import React from 'react';
import EachMessage from './EachMessage';

export default class ShowMessage extends React.Component{

    render(){
        let newData = this.props.messageData.map((data,index)=>{
            return(
            <EachMessage
            key={index}
             data={data}
            />
            )
           });


        return(
            <div  className="pull-left">
              {newData}
                </div>
        )
    }
}