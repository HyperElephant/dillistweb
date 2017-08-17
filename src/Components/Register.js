import React, { Component } from 'react';
import '../App.css';

import Fetcher from '../Fetcher';

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
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
    console.log(JSON.stringify({user: {email: this.state.email, password: this.state.password}}));
    Fetcher.Auth.login(this.state.username, this.state.email, this.state.password).then(function(response){
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
            <ul className="login-register-form-list">
                <li className="login-register-list-item">
                    <label>
                        Email:
                    </label>
                    <input 
                        name="email"
                        type="text" 
                        value={this.state.email} 
                        onChange={this.handleChange}/>
                </li>
                <li className="login-register-list-item">
                    <label>
                        Username:
                    </label>
                    <input 
                        name="username"
                        type="text" 
                        value={this.state.username} 
                        onChange={this.handleChange}/>
                </li>
                <li className="login-register-list-item">
                    <label>
                        Password:
                    </label>
                    <input
                        name="password"
                        type="text"
                        value={this.state.password}
                        onChange={this.handleChange}/>
                </li>
                <li className="login-register-list-item">
                    <input className="register-button"
                        type="submit"
                        value="Register" />
                </li>
                </ul>
        </form>
      </div>
    );
  }
}

export default Register;