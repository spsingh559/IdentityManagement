import React from 'react';
import BrentSchemaRow from './BrentSchemaRow';



export default class BrentShowSchema extends React.Component{

    deleteAttrName=(name)=>{
        this.props.deleteAttrName(name);
    }

   render(){

    let newData= this.props.data.map((data,i)=>{
        return(
            <BrentSchemaRow
            key={i}
            data={data}
            deleteAttrName={this.deleteAttrName}
            />
        )
    })

    return(
        <div>
{newData}
        </div>
    )
   }
}