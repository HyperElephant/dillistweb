import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';

import {getUserWishes, removeWish, claimWish, unclaimWish} from '../actions';

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  user: state.users.userProfile
});

const mapDispatchToProps = dispatch => ({
    removeWish: (id, author) => {
      dispatch(removeWish(id));
      dispatch(getUserWishes()); 
    },
    claimWish: (id, username) => {
      dispatch(claimWish(id));
      dispatch(getUserWishes(username));
    },
    unclaimWish: (id, username) => {
      dispatch(unclaimWish(id));
      dispatch(getUserWishes(username));
    }

  });

class WishView extends Component {
    render(){
        const wish = this.props.wish;
        const isCurrentUser = this.props.isCurrentUser;
        const user = this.props.user;
        const currentUser = this.props.currentUser;

        const removeWish = this.props.removeWish;
        const claimWish = this.props.claimWish;
        const unclaimWish = this.props.unclaimWish;

        function removeButton(isCurrentUser){
          if(isCurrentUser){
            return (
            <button onClick={() => removeWish(wish.id)} 
            className="wish-remove-button">&#10006;</button>);
          }
        }
        function claimButton(isCurrentUser){
          if(!isCurrentUser){
            if(!wish.giver){
              return(
                <button onClick={() => claimWish(wish.id, user.username)}
                  className="wish-claim-button">Claim Wish</button>);
            }
            else if(wish.giver && wish.giver.username === currentUser.username)
            {
              return(
                <button onClick={() => unclaimWish(wish.id, user.username)}
                className="wish-claim-button">Unclaim Wish</button>);
            }
            else{
              return(
                <p>Claimed</p>
              );
            }
          }
        }

        return (
          <div className="wish-view">
            <h4 className="wish-title">{wish.title}</h4>
            <a href={wish.url} className="wish-url">{wish.url}</a>
            {claimButton(isCurrentUser)}
            {removeButton(isCurrentUser)}
          </div>
        );
    }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(WishView);