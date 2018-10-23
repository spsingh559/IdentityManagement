import React from 'react';
import {Row, Col, Grid,Table} from 'react-bootstrap';



export default class ContractData extends React.Component{

    state={
        contractData:{
            cid:"sdfkl12312",
            borrowerid:"BR12423",
            lenderid:"L2342343",
            requestdate:"1st March, 2018",
            duedate:"17th Oct, 2018",
            approveddate:"1st May, 2018",
            amount:10000,
            status:"Confirmed",
            totalamount:100090,
            amountpaid:4500,
            ppd:1
        }
    }
      

    render(){

        return(
            <div >
           <Grid>
               <Col xs={12}>
               <Table striped bordered condensed hover style={{marginTop:"5px"}}>
            <tbody>
             <tr>
                 <td>
                     Contract ID 
                     </td>
                     <td>
                         {this.state.contractData.cid}
                     </td>
                 </tr>
                 <tr>

                 <td>
                     Borrower ID 
                     </td>
                     <td>
                     {this.state.contractData.borrowerid}
                     </td>
                 </tr>
                 <tr>
                 <td>
                     Lender ID 
                     </td>
                     <td>
                         {this.state.contractData.lenderid}
                     </td>
                 </tr>
                 <tr>
                 <td>
                 Requested Loan Date
                     </td>
                     <td>
                         {this.state.contractData.requestdate}
                     </td>
                 </tr>

                 <tr>
                 <td>
                 Approved Date
                     </td>
                     <td>
                         {this.state.contractData.approveddate}
                     </td>
                 </tr>

                 <tr>
                 <td>
                     Due Date
                     </td>
                     <td>
                         {this.state.contractData.duedate}
                     </td>
                 </tr>
                 
                 <tr>
                 <td>
                     Amount
                     </td>
                     <td>
                         {this.state.contractData.amount}
                     </td>
                 </tr>
                 <tr>
                 <td>
                 Total Amount Paid
                     </td>
                     <td>
                         {this.state.contractData.totalamount}
                     </td>
                 </tr>

                  <tr>
                 <td>
                 Balance Amount
                     </td>
                     <td>
                         {this.state.contractData.amount - this.state.contractData.amountpaid}
                     </td>
                 </tr>

                  <tr>
                 <td>
                 Interest Rate
                     </td>
                     <td>
                         {this.state.contractData.ppd} pphpd
                     </td>
                 </tr>

            </tbody>
          </Table>
               </Col>
               </Grid>
                </div>
        )
    }
}