import React, { Component } from 'react';
import './App.css';

import Register from './Components/Register';
import Header from './Components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Register />
      </div>
    );
  }
}

export default App;
