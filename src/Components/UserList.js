import React, { Component } from "react";
import UserView from "./UserView";

import PropTypes from "prop-types";

import User from "../Models/User";

const defaultNoUsersString = "No users to display.";

class UserList extends Component {
  render() {
    function getNoUsersString(props) {
      if (props.noUsersString) {
        return props.noUsersString;
      } else {
        return defaultNoUsersString;
      }
    }

    function body(props) {
      const userList = props.userList;
      if (!userList) {
        return <div>Loading...</div>;
      } else if (userList.length === 0) {
        return <div>{getNoUsersString(props)}</div>;
      } else {
        return (
          <div>
            {userList.map((user, i) => {
              return <UserView key={i} user={user} />;
            })}
          </div>
        );
      }
    }

    return <div>{body(this.props)}</div>;
  }
}

UserList.propTypes = {
  userList: PropTypes.arrayOf(PropTypes.instanceOf(User))
};

export default UserList;
