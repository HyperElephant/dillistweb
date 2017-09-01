import React, { Component } from 'react';
import '../App.css';

import UserList from '../Components/UserList';

import { getUserList } from '../actions'

import { connect } from 'react-redux';

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    userList: state.users.userList,
    userCount: state.users.userCount
});

const mapDispatchToProps = dispatch => ({
    onLoad: (props) => {
        if(props.currentUser){
            dispatch(getUserList());            
        }
    }
});

class AllUsers extends Component {

  componentWillMount() {
      this.props.onLoad(this.props);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.currentUser !== this.props.currentUser){
      this.props.onLoad(nextProps);
    }
  }

  render() {
    function getUsers(props) {
      if (props.userList) {
        return props.userList.map((user, i) => {
          if (user !== props.currentUser) {
            return user;
          }
          else {
            return null;
          }
        })
      }
      else{
        return null;
      }
    }

    const props = this.props;
    return (
      <div className="user-list">
        <h2>Users:</h2>
        <UserList userList={getUsers(props)}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);