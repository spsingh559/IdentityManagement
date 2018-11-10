import React from 'react';
import Chip from 'material-ui/Chip';
export default class EachMessage extends React.Component{

    render(){
        return(
            <div>
           
            <Chip>
          {this.props.data.message}
        </Chip>
        <br />
                </div>
        )
        
    }
}