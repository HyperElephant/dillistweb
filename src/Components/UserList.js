import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

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
            <div>
              {
                props.userList.map((user, i) => {
                  return (
                    <UserPreview key={i} user={user} />
                  );
                })
              }
            </div>
          );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);