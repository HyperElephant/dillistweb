import React, { Component } from 'react';
import './App.css';

import Register from './Components/Register';
import Login from './Components/Login';
import Header from './Components/Header';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isRegistered: false
    }
    this.handleLoginRegisterPressed = this.handleLoginRegisterPressed.bind(this);
  }

  handleLoginRegisterPressed() {
    this.setState({
      isRegistered: this.state.isRegistered ? false : true
    });
  }

  render() {
    let authComponent = null;
    let buttonText = "";
    if(this.state.isRegistered){
      authComponent = <Login/>
      buttonText = "Click here to register."
    } else {
      authComponent = <Register/>
      buttonText = "Click here to login."
    }

    return (
      <div className="App">
        <Header />
        <button onClick={this.handleLoginRegisterPressed}>{buttonText}</button>
        {authComponent}
      </div>
    );
  }
}

export default App;
