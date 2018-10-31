import React from 'react';
import UserData from './UserData';
export default class EachTAPendingServiceDetail extends React.Component{

    static get contextTypes() {
        return {
          router: React.PropTypes.object.isRequired
        }
      }
    
    approve=()=>{
        this.context.router.push(this.props.data.uiRoutes)
    }
   
    render(){
        
        return(

<div className="panel panel-primary" style={{ marginTop:"10px",height:"auto"}}>
<div className="panel-heading">{this.props.data.serviceName}</div>
  <div className="panel-body" style={{height:"300px", overflowY:"auto"}}>
  <UserData data={this.props.data.list} approve={this.approve}/>
  </div>
  <div className="panel-footer">{this.props.data.serviceDescription}</div>
</div>
        )
    }
   
}