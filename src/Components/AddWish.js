import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';

import { addWish } from '../actions'

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (title, url) =>
    dispatch(addWish(title, title))
});


class AddWish extends Component {

  constructor(props) {
    super(props);

    this.state = {
        title: "",
        url: "",
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
    this.props.onSubmit(this.state.title, this.state.url);
  }

  render() {
    return (
      <div className="Add Wish">
        <form onSubmit={this.handleSubmit}>
            <ul className="add-wish-form-list">
                <li className="add-wish-list-item">
                    <label>
                        Title:
                    </label>
                    <input 
                        name="title"
                        type="text" 
                        value={this.state.title} 
                        onChange={this.handleChange}/>
                </li>
                <li className="add-wish-list-item">
                    <label>
                        URL:
                    </label>
                    <input
                        name="url"
                        type="text"
                        value={this.state.url}
                        onChange={this.handleChange}/>
                </li>
                <li className="add-wish-register-list-item">
                    <input className="add-wish-button"
                        type="submit"
                        value="Add" />
                </li>
                </ul>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWish);