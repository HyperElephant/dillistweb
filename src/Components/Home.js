import React, { Component } from 'react';
import '../App.css';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
    currentUser: state.common.currentUser
});

class Home extends Component {
  render() {
    function wishes(props) {
        if(props.currentUser && props.currentUser.wishes){
            props.currentUser.wishes.map(function(wish){
                return <li>{wish}</li>;
            });
        } else {
            return <p>No Wishes</p>;
        }
    }

    function user(props){
        if(props.currentUser){
            return props.currentUser.username;
        } else {
            return "";
        }
    }
    
    return (
        <div className="home">
          <h2>Wishes for {user(this.props)}</h2>
          <ul>
              {wishes(this.props)}
          </ul>
        </div>
    );
  }
}

export default connect(mapStateToProps, {})(Home);