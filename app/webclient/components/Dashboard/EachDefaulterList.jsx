import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContractData from './ContractData';

export default class EachSummaryData extends React.Component{

    state={
        modalView:false
    }

    handleOpen = () => {
        this.setState({modalView: true});
      };
    
      handleClose = () => {
        this.setState({modalView: false});
      };

    contractID=()=>{
        this.setState({modalView:true});
    }

    render(){
        
        const actions = [
            <div style={{backgroundColor:"rgb(0, 188, 212)", color:"white", width:"100%", height:"50px"}}>
                  <center>
                  <h4 onTouchTap={this.handleClose} style={{padding:"15px 5px"}}> Cancel </h4>
                  </center>
                  </div>
          ];

          let loanTitle=[
              <div style={{backgroundColor:"rgb(0, 188, 212)", color:"white", width:"100%", height:"50px"}}>
                  <center>
                  <h4 style={{padding:"15px 5px"}}> Contract Detail </h4>
                  </center>
                  </div>
          ]
        
        return(
            <tr>
               
                    <td>
                        <a onTouchTap={this.contractID}>
                    {this.props.data.contractID}
                    </a>
                    </td>
                    <td>
                    {this.props.data.amount}
                    </td>
                    <td>
                    {this.props.data.balanceAmount}
                    </td>
                    <td>
                    {this.props.data.dueDate}
                    </td>
                    <td>
                   Block
                    </td>
                    <Dialog
          title={loanTitle}

          actions={actions}
          modal={true}
          open={this.state.modalView}
          contentStyle={{height:"100%", width:"100%"}}
        >
        <ContractData contractID={this.props.contractID}/>
        </Dialog>
                </tr>
        )
    }
}