import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";

import PropTypes from "prop-types";

import { addWish } from "../actions";

const mapStateToProps = state => ({
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (title, url) => dispatch(addWish(title, url))
});

class AddWish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      url: ""
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
    this.props.onSubmit(this.state.title, this.state.url);
    this.setState({
      title: "",
      url: ""
    });
  }

  render() {
    return (
      <div className="add-wish">
        <h2 className="add-wish-title">Go ahead, make a wish!</h2>
        <form onSubmit={this.handleSubmit}>
          <ul className="add-wish-form-list">
            <li className="add-wish-list-item">
              <input
                name="title"
                placeholder="Title (ex: Pony)"
                type="text"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </li>
            <li className="add-wish-list-item">
              <input
                placeholder="url"
                name="url"
                type="text"
                value={this.state.url}
                onChange={this.handleChange}
              />
            </li>
            <li className="add-wish-list-item">
              <input className="add-wish-button" type="submit" value="Wish" />
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

AddWish.propTypes = {
  onSubmit: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(AddWish);
