import React, { Component } from "react";
import "../App.css";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import {
  getUserWishes,
  getUserProfile,
  addFriend,
  removeFriend
} from "../actions";

import User from "../Models/User";
import Wish from "../Models/Wish";

import WishList from "../Components/WishList";

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  wishList: state.wishes.wishList,
  wishesCount: state.wishes.wishesCount,
  user: state.users.userProfile
});

const mapDispatchToProps = dispatch => ({
  onLoad: props => {
    if (props.match.params.username) {
      dispatch(getUserProfile(props.match.params.username));
    }
  },
  onUserLoaded: username => {
    dispatch(getUserWishes(username));
  },
  addFriend: username => {
    dispatch(addFriend(username));
  },
  removeFriend: username => {
    dispatch(removeFriend(username));
  }
});

class Profile extends Component {
  componentWillMount() {
    this.props.onLoad(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.props.onUserLoaded(nextProps.user.username);
    }
  }

  render() {
    function user(props) {
      if (props.user) {
        return props.user.username;
      } else {
        return "";
      }
    }

    function isFriend(props) {
      if (props.user && props.user.isFriend) {
        return <div>{user(props)} is your friend!</div>;
      } else {
        return null;
      }
    }

    function friendButton(props) {
      if (!props.user) {
        return null;
      } else if (props.user.isFriend) {
        return (
          <button onClick={() => props.removeFriend(props.user.username)}>
            Remove Friend
          </button>
        );
      } else {
        return (
          <button onClick={() => props.addFriend(props.user.username)}>
            Add Friend
          </button>
        );
      }
    }

    return (
      <div className="home">
        <div className="wishList">
          <h2>Wishes for {user(this.props)}</h2>
          {isFriend(this.props)}
          {friendButton(this.props)}
          <WishList wishList={this.props.wishList} isCurrentUser={false} />
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  currentUser: PropTypes.instanceOf(User),
  wishList: PropTypes.arrayOf(PropTypes.instanceOf(Wish)),
  wishesCount: PropTypes.number,
  user: PropTypes.instanceOf(User),

  onLoad: PropTypes.func,
  onUserLoaded: PropTypes.func,
  addFriend: PropTypes.func,
  removeFriend: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
