import React, { Component } from 'react';
import '../App.css';

class WishView extends Component {
    render(){
        const user = this.props.user;
        
          return (
            <div className="user-preview">
              <h4 className="user-username">{user.username}</h4>
            </div>
          );
    }
  
}

export default WishView;