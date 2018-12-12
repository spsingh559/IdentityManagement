import React from 'react';
import UserData from './UserData';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
export default class EachTAPendingServiceDetail extends React.Component{

    // state = {
    //     open: false,
    //   };

    static get contextTypes() {
        return {
          router: React.PropTypes.object.isRequired
        }
      }
    
    approve=(name)=>{

        this.context.router.push(this.props.data.uiRoutes+'/'+name+'/'+this.props.data.CredDefId+'/'+this.props.data._id);
    }
    genrateProof=(name)=>{
        // console.log('name reached in genrate Proof', name);
        // this.setState({open: true});
        this.context.router.push('/genrateProof/'+name+'/'+this.props.data.serviceName+'/'+this.props.data.owner);
    }

    // handleClose = () => {
    //     this.setState({open: false});
    //   };
    approveForResponse=(obj,_id)=>{
      // add code for all services to define naviagtion path
      if(this.props.data.serviceName=="Grammar School Certificate"){
        this.context.router.push(this.props.data.uiRoutes+'/'+obj.name+'/'+obj.dateOfBirth+'/'+this.props.data._id);
      }
    }
    render(){
        const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];
        return(

<div className="panel panel-primary" style={{ marginTop:"10px",height:"auto"}}>
<div className="panel-heading">{this.props.data.serviceName}</div>
  <div className="panel-body" style={{height:"300px", overflowY:"auto"}}>
  <UserData data={this.props.data.list}
            approve={this.approve} 
            serviceName={this.props.data.serviceName}
            owner={this.props.data.owner}
            proofReq={this.props.data.proofReq}
            genrateProof={this.genrateProof}
            approveForResponse={this.approveForResponse}
 />
  </div>
  <div className="panel-footer">{this.props.data.serviceDescription}</div>
  {/* <Dialog
          title="Genrate Proof Window"
          actions={actions}
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi odio magnam qui ipsum placeat et eligendi corporis animi! Quibusdam, incidunt. Itaque ipsa quasi eaque cumque sequi obcaecati commodi repudiandae officia.
        </Dialog> */}
</div>
        )
    }
   
}