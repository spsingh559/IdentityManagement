import React from 'react';


import EachApproveCertificate from './EachApproveCertificate';
export default class ApproveCertificate extends React.Component{

   
   
    render(){
        console.log('data inside Approve crtificate');
        console.log(this.props.data);

        let newData=this.props.data.map((data,i)=>{
            return(
                <EachApproveCertificate
                key={i}
                data={data}
                />
            )
        })

        console.log('newData is', newData);
        return(
            <div >
            {newData}
      </div>
        )
    }
   
}