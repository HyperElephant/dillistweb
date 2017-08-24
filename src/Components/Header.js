import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { logout } from '../actions';

const mapStateToProps = state => ({
    currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    console.log("Logout");
    dispatch(logout())
  }
});

class Header extends Component {
  render() {
    function navs(props) {
      if(props.currentUser){
        return(
          <div>
            <li><Link to='/home'>Home</Link></li>
            <li><Link to='/users'>Users</Link></li>
            <li>
              <button onClick= {() => props.onLogout() }>
                Logout
              </button>
            </li>
          </div>
        );
      } 
      else {
        return(
          <div>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li>
          </div>
        );
      }
    } 

    
    return (
        <div className="App-header">
          <h1 className="App-title">Dillist</h1>
          <nav className="header-nav">
            <ul className="header-list">
              {navs(this.props)}
            </ul>
          </nav>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);