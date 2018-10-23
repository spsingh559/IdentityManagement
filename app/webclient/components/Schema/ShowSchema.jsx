import React from 'react';
import SchemaRow from './SchemaRow';



export default class ShowSchema extends React.Component{

    deleteAttrName=(name)=>{
        this.props.deleteAttrName(name);
    }

   render(){

    let newData= this.props.data.map((data,i)=>{
        return(
            <SchemaRow
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