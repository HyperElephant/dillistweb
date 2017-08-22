import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';

import {getUserWishes, removeWish} from '../actions';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    removeWish: (id, author) => {
      dispatch(removeWish(id));
      dispatch(getUserWishes(author));    
    }
      
  });

class WishView extends Component {
    render(){
        const wish = this.props.wish;
        const isCurrentUser = this.props.isCurrentUser;
        function removeButton(isCurrentUser){
          if(isCurrentUser){
            console.log(isCurrentUser);
            return (
            <button onClick={() => this.props.removeWish(wish.id, wish.author)} 
            className="wish-remove-button">Remove</button>);            
            
          }
        }
          return (
            <div className="wish-view">
              <h4 className="wish-title">{wish.title}</h4>
              <a href={wish.url} className="wish-url">{wish.url}</a>
              {removeButton(isCurrentUser)}
            </div>
          );
    }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(WishView);