import React, { Component } from 'react';
import '../App.css';

class Home extends Component {
  render() {
    return (
        <div className="home">
          <h2>Wishes</h2>
          <ul>
              {this.props.wishes.map(function(wish){
                return <li>{wish}</li>;
              })}

          </ul>
        </div>
    );
  }
}

export default Home;