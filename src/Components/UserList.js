import React, { Component } from 'react';
import '../App.css';

import { getUserList } from '../actions'

import { connect } from 'react-redux';

import UserPreview from './UserPreview';

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
        let props = this.props;
        if (!props.userList) {
            return (
              <div>Loading...</div>
            );
          }
        
          if (props.userList.length === 0) {
            return (
              <div>
                No users.
              </div>
            );
          }
        
          return (
            <div className="user-list">
              <h2>Users:</h2>
              {
                props.userList.map((user, i) => {
                  if(this.props.currentUser && user.username !== this.props.currentUser.username){
                    return (
                      <UserPreview key={i} user={user} />
                    );
                  }
                  else {
                    return null;
                  }
                  
                })
              }
            </div>
          );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);