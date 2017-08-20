import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';

import {removeWish} from '../actions';

const mapStateToProps = state => ({
    
});

const mapDispatchToProps = dispatch => ({
    removeWish: (id) =>
      dispatch(removeWish(id))
  });

class WishView extends Component {
    render(){
        const wish = this.props.wish;
        
          return (
            <div className="wish-view">
              <h4 className="wish-title">{wish.title}</h4>
              <a href={wish.url} className="wish-url">{wish.url}</a>
              <button onClick={() => this.props.removeWish(wish.id)} className="wish-remove-button">Remove</button>
            </div>
          );
    }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(WishView);