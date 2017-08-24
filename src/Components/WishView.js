import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';

import {getUserWishes, removeWish} from '../actions';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    removeWish: (id, author) => {
      dispatch(removeWish(id));
      dispatch(getUserWishes());    
    }
      
  });

class WishView extends Component {
    render(){
        const wish = this.props.wish;
        const isCurrentUser = this.props.isCurrentUser;
        const removeWish = this.props.removeWish;
        function removeButton(isCurrentUser){
          if(isCurrentUser){
            return (
            <button onClick={() => removeWish(wish.id)} 
            className="wish-remove-button">&#10006;</button>);            
            
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