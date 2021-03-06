import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { logout } from "../actions";

import User from "../Models/User";

const mapStateToProps = state => ({
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => {
    dispatch(logout());
  }
});

class Header extends Component {
  render() {
    function navs(props) {
      if (props.currentUser) {
        return (
          <div>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/friends">Friends</Link>
            </li>
            <li>
              <button onClick={() => props.onLogout()}>Logout</button>
            </li>
          </div>
        );
      } else {
        return (
          <div>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </div>
        );
      }
    }

    return (
      <div className="App-header">
        <h1 className="App-title">Dillist</h1>
        <nav className="header-nav">
          <ul className="header-list">{navs(this.props)}</ul>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  currentUser: PropTypes.instanceOf(User),
  onLogout: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
