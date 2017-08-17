import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="App-title">Dillist</h2>
          <nav>
            <ul className="header-list">
              <li><Link to='/home'>Home</Link></li>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/register'>Register</Link></li>
            </ul>
          </nav>
        </div>
    );
  }
}

export default Header;