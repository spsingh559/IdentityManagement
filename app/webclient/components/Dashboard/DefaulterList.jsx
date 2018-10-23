// import React from 'react';

// export default class DefaulterList extends React.Component{

//     render(){

//         return(
//             <div style={{marginTop:"50px"}}>
//             DefaulterList
//                 </div>
//         )
//     }
// }

import React from 'react';
import {Table} from 'react-bootstrap';
import EachDefaulterList from './EachDefaulterList';

export default class DefaulterList extends React.Component{

    render(){

        let newData=this.props.defaultData.map((data,i)=>{
            return(
                <EachDefaulterList 
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
               
                <th>Contract ID</th>
                <th>Amount</th>
                <th>Balance Amount</th>
                <th>Due Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {newData}
            </tbody>
          </Table>
        )
    }
}