import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { register } from "../actions";

const mapStateToProps = state => ({
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (username, email, password) =>
    dispatch(register(username, email, password))
});

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: ""
    };

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
    let history = this.props.history;
    this.props.onSubmit(
      this.state.username,
      this.state.email,
      this.state.password
    );
    history.push("/home");
  }

  render() {
    return (
      <div className="Register">
        <h2 className="login-register-title">Happy to have you join us!</h2>
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
                placeholder="username"
                name="username"
                type="text"
                value={this.state.username}
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
              <input
                className="register-button"
                type="submit"
                value="Register"
              />
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
