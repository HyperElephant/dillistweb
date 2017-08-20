import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';

import { login } from '../actions'

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (email, password) =>
    dispatch(login(email, password))
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
    this.props.onSubmit(this.state.email, this.state.password);
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);