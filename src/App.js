import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Fetcher from './Fetcher';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {}

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Submit");
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input 
              name="email"
              type="text" 
              value={this.state.email} 
              onChange={this.handleChange}/>
          </label>
          <label>
            Username:
            <input 
              name="username"
              type="text" 
              value={this.state.username} 
              onChange={this.handleChange}/>
          </label>
          <label>
            Password:
            <input
              name="password"
              type="text"
              value={this.state.password}
              onChange={this.handleChange}/>
          </label>
          <input 
            type="submit"
            value="Submit" />
        </form>
        <div>
          Hello {this.state.username}!
        </div>
      </div>
    );
  }
}

export default App;
