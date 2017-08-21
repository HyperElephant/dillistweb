import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../App.css';

class WishView extends Component {
    render(){
        const user = this.props.user;
        
          return (
            <div className="user-preview">
              <Link className="user-username" to={`/user/${user.username}`}>
                {user.username}
              </Link>
            </div>
          );
    }
  
}

export default WishView;