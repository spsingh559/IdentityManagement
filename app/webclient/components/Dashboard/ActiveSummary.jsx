import React from 'react';
import {Table} from 'react-bootstrap';
import EachSummaryData from './EachSummaryData';

export default class ActiveSummary extends React.Component{

    render(){

        let newData=this.props.summaryData.map((data,i)=>{
            return(
                <EachSummaryData 
                key={i}
                i={i+1}
                data={data}
                />
            )
        })

        return(
            
            <Table striped bordered condensed hover style={{marginTop:"5px"}}>
            <thead style={{backgroundColor:"rgb(0, 188, 212)", color:"white"}}>
              <tr>
                <th>Index</th>
                <th>Contract ID</th>
                <th>Interest Rate</th>
                <th>Amount</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {newData}
            </tbody>
          </Table>
        )
    }
}