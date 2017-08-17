import React, { Component } from 'react';
import '../App.css';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
    currentUser: state.common.currentUser
});

class Home extends Component {
  render() {
    function wishes(props) {
        if(this.currentUser && this.currentUser.wishes){
            this.currentUser.wishes.map(function(wish){
                return <li>{wish}</li>;
            });
        } else {
            return <p>No Wishes</p>;
        }
    }
    
    return (
        <div className="home">
          <h2>Wishes</h2>
          <ul>
              {wishes}
          </ul>
        </div>
    );
  }
}

export default connect(mapStateToProps, {})(Home);