import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFriends } from '../actions';

import UserList from '../Components/UserList';

import '../App.css';

const mapStateToProps = state => ({
    friends: state.common.friends,
});

const mapDispatchToProps = dispatch => ({
    onLoad: (props) => {
        if(props.currentUser) {
            dispatch(getFriends());
        }
    }
})

class Friends extends Component {

    componentWillMount() {
        this.props.onLoad(this.props);
    }

    componentWillRecieveProps(newProps) {
        if (newProps.currentUser) {
            this.props.onLoad(newProps);
        }
    }

    render() {
        const friends = this.props.friends;

        return (
            <div className="user-list">
                <h2>Friends:</h2>
                <UserList userList={friends} noUsersString={"No friends... :("}/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);