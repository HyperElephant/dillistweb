import React, { Component } from "react";
import "../App.css";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { getUserList } from "../actions";

import User from "../Models/User";

import UserList from "../Components/UserList";

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  userList: state.users.userList,
  userCount: state.users.userCount
});

const mapDispatchToProps = dispatch => ({
  onLoad: props => {
    if (props.currentUser) {
      dispatch(getUserList());
    }
  }
});

class AllUsers extends Component {
  componentWillMount() {
    this.props.onLoad(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser !== this.props.currentUser) {
      this.props.onLoad(nextProps);
    }
  }

  render() {
    function getUsers(props) {
      if (props.userList) {
        return props.userList.map(user => {
          if (user !== props.currentUser) {
            return user;
          } else {
            return null;
          }
        });
      } else {
        return null;
      }
    }

    const props = this.props;
    return (
      <div className="user-list">
        <h2>Users:</h2>
        <UserList userList={getUsers(props)} />
      </div>
    );
  }
}

AllUsers.propTypes = {
  currentUser: PropTypes.instanceOf(User),
  //userList: PropTypes.arrayOf(PropTypes.instanceof(User)),
  userList: PropTypes.arrayOf(PropTypes.object),
  userCount: PropTypes.number,

  onLoad: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
