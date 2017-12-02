import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Validator from "email-validator";

import { login } from "../actions";

const mapStateToProps = state => ({
  //Pending
  loginPending: state.common.loginPending,

  //Error
  error: state.common.loginError
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (email, password) => dispatch(login(email, password))
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMessage = this.getMessage.bind(this);
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

  getMessage(props) {
    if (props.loginPending) {
      return "Logging in...";
    } else if (props.error) {
      return props.error.message;
    }
  }

  render() {
    return (
      <div className="Login">
        <h2 className="login-register-title">Welcome back!</h2>
        <form onSubmit={this.handleSubmit}>
          <ul className="login-register-form-list">
            <li className="login-register-list-item">
              <input
                placeholder="email"
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </li>
            <li className="login-register-list-item">
              <input
                placeholder="password"
                name="password"
                type="text"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </li>
            <li className="login-register-list-item">
              <input className="register-button" type="submit" value="Login" />
            </li>
            <li className="login-register-list-item">
              {this.getMessage(this.props)}
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
