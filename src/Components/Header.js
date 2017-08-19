import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
    currentUser: state.common.currentUser
});

class Header extends Component {
  render() {
    function navs(props) {
      if(props.currentUser){
        return(
          <li><Link to='/home'>Home</Link></li>
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
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="App-title">Dillist</h2>
          <nav>
            <ul className="header-list">
              {navs(this.props)}
            </ul>
          </nav>
        </div>
    );
  }
}

export default connect(mapStateToProps, {})(Header);