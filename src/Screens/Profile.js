import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";

const CLAIMED_WISHES = "CLAIMED_WISHES";
const WISHES = "WISHES";

const FRIENDS = "FRIENDS";
const REQUESTS = "REQUESTS";
const PENDING = "PENDING";

class CurrentProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wishesViewing: WISHES,
      friendsViewing: FRIENDS
    };
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
        return "";
      }
    }

    return (
      <div>
        <h2>{user(this.props)}</h2>
        <div className="friends-view">
          {friendsButtons(this.state)}
          {friendsSwitch(this.props, this.state.friendsViewing)}
        </div>
        <div className="wishes-view">
          {wishesButtons(this.state)}
          {wishesOrClaimed(this.props, this.state.wishesViewing)}
        </div>
      </div>
    );
  }
}
