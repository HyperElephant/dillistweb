import React, { Component } from 'react';
import '../App.css';
import Fetcher from '../Fetcher';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (email, password) =>
    dispatch({ type: 'LOGIN', payload: Fetcher.Auth.login(email, password) })
});

class Login extends Component {

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
    Fetcher.Auth.login(this.state.email, this.state.password).then(function(response){
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
                        value="Login" />
                </li>
                </ul>
        </form>
      </div>
    );
  }
}

export default Login;