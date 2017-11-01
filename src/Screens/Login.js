import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Validator from 'email-validator';

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
    if (Validator.validate(this.state.email)) {
      this.props.onSubmit(this.state.email, this.state.password);
    } else {
      alert("Must login with a valid email.");
    }
  }

  render() {

    return (
      <div className="Login">
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

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);