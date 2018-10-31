import React from 'react';
import Paper from 'material-ui/Paper';
import {Col, Row, Grid,Image} from 'react-bootstrap';
import Divider from 'material-ui/Divider/Divider';
import LinearProgress from 'material-ui/LinearProgress';
import ActionHome from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import Content from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import Axios from 'axios';
import restUrl from '../restUrl';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Send from 'material-ui/svg-icons/content/send';
import Snackbar from 'material-ui/Snackbar';

import EachTAPendingServiceDetail from './EachTAPendingServiceDetail';
export default class TAPendingServiceDetail extends React.Component{

    // getNow=(_id,obj)=>{
    //     this.props.getNow(_id,obj)
    // }
   
    render(){
        console.log('data in TAPending');
        console.log(this.props.data);

        let newData=this.props.data.map((data,i)=>{
            return(
                <EachTAPendingServiceDetail
                key={i}
                data={data}
                // getNow={this.getNow}
                />
            )
        })

        return(
            <div >
            {newData}
      </div>
        )
    }
   
}