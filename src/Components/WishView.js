import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import {getUserWishes, removeWish, claimWish, unclaimWish, getClaimedWishes} from '../actions';

import User from '../Models/User';
import Wish from '../Models/Wish';

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  user: state.users.userProfile
});

const mapDispatchToProps = dispatch => ({
    removeWish: (id) => {
      dispatch(removeWish(id));
      dispatch(getUserWishes()); 
    },
    claimWish: (id, user) => {
      dispatch(claimWish(id));
      if(user){
        dispatch(getUserWishes(user.username));        
      } else {
        dispatch(getUserWishes());
        dispatch(getClaimedWishes());          
      }
    },
    unclaimWish: (id, user) => {
      dispatch(unclaimWish(id));
      if(user){
        dispatch(getUserWishes(user.username));        
      } else {
        dispatch(getUserWishes()); 
        dispatch(getClaimedWishes());                 
      }
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
                <button onClick={() => claimWish(wish.id, user)}
                  className="wish-claim-button">Claim Wish</button>);
            }
            else if(wish.giver && wish.giver.username === currentUser.username)
            {
              return(
                <button onClick={() => unclaimWish(wish.id, user)}
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

WishView.propTypes = {
  wish: PropTypes.instanceOf(Wish).isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
  user: PropTypes.instanceOf(User),
  currentUser: PropTypes.instanceOf(User).isRequired,

  removeWish: PropTypes.func.isRequired,
  claimWish: PropTypes.func.isRequired,
  unclaimWish: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(WishView);