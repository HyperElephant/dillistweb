import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getUserWishes,
  getClaimedWishes,
  getFriends,
  logout
} from "../actions";

import User from "../Models/User";
import Wish from "../Models/Wish";
import WishList from "../Components/WishList";
import UserList from "../Components/UserList";

const CLAIMED_WISHES = "CLAIMED_WISHES";
const WISHES = "WISHES";
const FRIENDS = "FRIENDS";
const SETTINGS = "SETTINGS";

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  wishList: state.wishes.wishList,
  wishesCount: state.wishes.wishesCount,
  claimedWishes: state.wishes.claimedWishes,
  claimedWishesCount: state.wishes.claimedWishesCount,
  friends: state.users.friends
});

const mapDispatchToProps = dispatch => ({
  onLoad: props => {
    if (props.currentUser) {
      dispatch(getUserWishes());
      dispatch(getClaimedWishes());
      dispatch(getFriends());
    }
  },
  onLogout: () => {
    dispatch(logout());
  }
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewing: WISHES
    };

    this.handleViewSwitch = this.handleViewSwitch.bind(this);
  }

  componentWillMount() {
    this.props.onLoad(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser !== this.props.currentUser) {
      this.props.onLoad(nextProps);
    }
  }

  handleViewSwitch(view) {
    this.setState({
      viewing: view
    });
  }

  render() {
    const handler = this.handleViewSwitch;

    const selectedButton = "home-tab-item home-tab-selected";
    const normalButton = "home-tab-item";

    function wishesOrClaimed(props, viewing) {
      if (viewing === WISHES) {
        return (
          <div className="home__selected-content">
            <WishList wishList={props.wishList} isCurrentUser={true} />
          </div>
        );
      } else if (viewing === CLAIMED_WISHES) {
        return (
          <div className="home__selected-content">
            <WishList wishList={props.claimedWishes} isCurrentUser={true} />
          </div>
        );
      } else if (viewing === FRIENDS) {
        return (
          <div className="home__selected-content">
            <UserList
              userList={props.friends}
              noUsersString={"No friends... :("}
            />
          </div>
        );
      } else if (viewing === SETTINGS) {
        return (
          <div className="home__selected-content">
            <button className="logout-button" onClick={() => props.onLogout()}>
              Logout
            </button>
          </div>
        );
      }
    }

    function viewButtons(state) {
      return (
        <div>
          <button
            onClick={() => handler(WISHES)}
            className={state.viewing === WISHES ? selectedButton : normalButton}
          >
            Your Wishes
          </button>
          <button
            onClick={() => handler(CLAIMED_WISHES)}
            className={
              state.viewing === CLAIMED_WISHES ? selectedButton : normalButton
            }
          >
            Claimed Wishes
          </button>
          <button
            onClick={() => handler(FRIENDS)}
            className={
              state.viewing === FRIENDS ? selectedButton : normalButton
            }
          >
            Friends
          </button>
          <button
            onClick={() => handler(SETTINGS)}
            className={
              state.viewing === SETTINGS ? selectedButton : normalButton
            }
          >
            Settings
          </button>
        </div>
      );
    }

    function homeBody(props, state) {
      if (props.currentUser) {
        return (
          <div className="home">
            <h2>{user(props)}</h2>
            <div className="make-wish">
              <Link to="/addwish">Make a Wish!</Link>
            </div>
            {viewButtons(state)}
            <div className="wish-list">
              {wishesOrClaimed(props, state.viewing)}
            </div>
          </div>
        );
      } else {
        return (
          <div className="home">
            <h2>Welcome to Dillist.</h2>
          </div>
        );
      }
    }

    function user(props) {
      if (props.currentUser) {
        return props.currentUser.username;
      } else {
        return "";
      }
    }

    return homeBody(this.props, this.state);
  }
}

Home.propTypes = {
  currentUser: PropTypes.instanceOf(User),
  wishList: PropTypes.arrayOf(PropTypes.instanceOf(Wish)),
  wishesCount: PropTypes.number,
  claimedWishes: PropTypes.arrayOf(PropTypes.instanceOf(Wish)),
  claimedWishesCount: PropTypes.number,

  onLoad: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
