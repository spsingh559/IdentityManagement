import React from 'react';
import ApproveUserData from './ApproveUserData';
export default class EachTAApproveServiceDetail extends React.Component{

    static get contextTypes() {
        return {
          router: React.PropTypes.object.isRequired
        }
      }
    
    // approve=(name)=>{
    //     this.context.router.push(this.props.data.uiRoutes+'/'+name+'/'+this.props.data.CredDefId+'/'+this.props.data._id);
    // }
   
    render(){
        
        return(

<div className="panel panel-primary" style={{ marginTop:"10px",height:"auto"}}>
<div className="panel-heading">{this.props.data.serviceName}</div>
  <div className="panel-body" style={{height:"300px", overflowY:"auto"}}>
  {/* <UserData data={this.props.data.list} approve={this.approve}/> */}
  <ApproveUserData data={this.props.data.list} timeStamp={this.props.data.timeStamp}/>
  </div>
  <div className="panel-footer">{this.props.data.serviceDescription}</div>
</div>
        )
    }
   
}