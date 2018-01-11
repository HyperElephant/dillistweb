import React, { Component } from "react";
import "../App.css";
import "./Profile.css";
import { connect } from "react-redux";

import WishList from "../Components/WishList";
import UserList from "../Components/UserList";
import AddWish from "../Components/AddWish";

const CLAIMED_WISHES = "CLAIMED_WISHES";
const WISHES = "WISHES";

const FRIENDS = "FRIENDS";
const REQUESTS = "REQUESTS";
const PENDING = "PENDING";

const mapStateToProps = state => ({
  /*
  currentUser: state.common.currentUser,
  wishList: state.wishes.wishList,
  wishesCount: state.wishes.wishesCount,
  claimedWishes: state.wishes.claimedWishes,
  claimedWishesCount: state.wishes.claimedWishesCount,
  friends: state.users.friends
  */
});

const mapDispatchToProps = dispatch => ({
  /*
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
  */
});

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wishesViewing: WISHES,
      friendsViewing: FRIENDS
    };

    this.handleWishesViewSwitch = this.handleWishesViewSwitch.bind(this);
    this.handleFriendsViewSwitch = this.handleFriendsViewSwitch.bind(this);
  }

  handleWishesViewSwitch(view) {
    this.setState({
      wishesViewing: view
    });
  }

  handleFriendsViewSwitch(view) {
    this.setState({
      friendsViewing: view
    });
  }

  render() {
    const wishHandler = this.handleWishesViewSwitch;
    const friendsHandler = this.handleFriendsViewSwitch;

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
      }
    }

    function friendsSwitch(props, viewing) {
      if (viewing === FRIENDS) {
        return (
          <div className="home__selected-content">
            <UserList
              userList={props.friends}
              noUsersString={"No friends... :("}
            />
          </div>
        );
      }
    }

    function wishesButtons(state) {
      return (
        <div>
          <button
            onClick={() => wishHandler(WISHES)}
            className={state.viewing === WISHES ? selectedButton : normalButton}
          >
            Your Wishes
          </button>
          <button
            onClick={() => wishHandler(CLAIMED_WISHES)}
            className={
              state.viewing === CLAIMED_WISHES ? selectedButton : normalButton
            }
          >
            Claimed Wishes
          </button>
        </div>
      );
    }
    function friendsButtons(state) {
      return (
        <div>
          <button
            onClick={() => friendsHandler(FRIENDS)}
            className={
              state.viewing === FRIENDS ? selectedButton : normalButton
            }
          >
            Friends
          </button>
        </div>
      );
    }
    function user(props) {
      if (props.currentUser) {
        return props.currentUser.username;
      } else {
        return "Hello!";
      }
    }
    function addWish(props) {
      if (props.currentUser === props.user) {
        return (
          <div className="addWish-view profile-section">
            <AddWish />
          </div>
        );
      }
    }

    return (
      <div>
        <h2>{user(this.props)}</h2>
        <div className="friends-view profile-section">
          {friendsButtons(this.state)}
          {friendsSwitch(this.props, this.state.friendsViewing)}
        </div>
        <div className="wishes-view profile-section">
          {wishesButtons(this.state)}
          {wishesOrClaimed(this.props, this.state.wishesViewing)}
        </div>
        {addWish(this.props)}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
