import React, { Component } from 'react';
import '../App.css';

import { getUserList } from '../actions'

import { connect } from 'react-redux';

import UserPreview from '../Components/UserPreview';

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

class UserList extends Component {

  componentWillMount() {
      this.props.onLoad(this.props);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.currentUser){
      this.props.onLoad(nextProps);
    }
  }

  render() {
    function users(props) {
      if (!props.userList) {
        return (<div>Loading...</div>);
      }
      else if (props.userList.length === 0) {
        return (<div>No users.</div>);
      }
      else {
        return(
          props.userList.map((user, i) => {
            if(!props.currentUser && user.username !== props.currentUser.username){
              return (
                <UserPreview key={i} user={user} />
              );
            }
            else {
              return null;
            }
          })
        )
      }
    }

    return (
      <div className="user-list">
        <h2>Users:</h2>
        <div>{
          users(this.props)
        }</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);