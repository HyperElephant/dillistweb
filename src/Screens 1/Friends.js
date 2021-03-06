import React, { Component } from "react";
import { connect } from "react-redux";
import { getFriends } from "../actions";

import PropTypes from "prop-types";

import User from "../Models/User";

import UserList from "../Components/UserList";

import "../App.css";

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  friends: state.users.friends
});

const mapDispatchToProps = dispatch => ({
  onLoad: props => {
    if (props.currentUser) {
      dispatch(getFriends());
    }
  }
});

class Friends extends Component {
  componentWillMount() {
    this.props.onLoad(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser !== this.props.currentUser) {
      this.props.onLoad(nextProps);
    }
  }

  render() {
    const friends = this.props.friends;

    return (
      <div className="user-list">
        <h2>Friends:</h2>
        <UserList userList={friends} noUsersString={"No friends... :("} />
      </div>
    );
  }
}

Friends.propTypes = {
  currentUser: PropTypes.instanceOf(User).isRequired,
  friends: PropTypes.arrayOf(PropTypes.instanceOf(User)),

  onLoad: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
