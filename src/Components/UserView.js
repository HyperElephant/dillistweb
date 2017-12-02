import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "../App.css";

import User from "../Models/User";

class UserView extends Component {
  render() {
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

UserView.propTypes = {
  user: PropTypes.instanceOf(User).isRequired
};

export default UserView;
