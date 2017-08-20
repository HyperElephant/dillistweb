import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom';

import Header from './Components/Header';
import Main from './Components/Main';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Route component={Main}/>
      </div>
    )
  }
}

export default App;
