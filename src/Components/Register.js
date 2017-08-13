import React, { Component } from 'react';
import '../App.css';

import Fetcher from '../Fetcher';

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
        username: "",
        email: "",
        password: ""
    }

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
    console.log(JSON.stringify({user: {username: this.state.username, email: this.state.email, password: this.state.password}}));
    Fetcher.Auth.register(this.state.username, this.state.email, this.state.password).then(function(response){
      console.log(response);
      if(!response.errors){
        Fetcher.setToken(response.user.token);
      }
    });
  }


  render() {
    return (
      <div className="Register">
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

export default Register;