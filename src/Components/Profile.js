import React, { Component } from 'react';
import '../App.css';

import { getUserWishes, getUserProfile } from '../actions'

import { connect } from 'react-redux';

import WishList from './WishList';


const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    wishList: state.wishes.wishList,
    wishesCount: state.wishes.wishesCount,
    user: state.users.userProfile
});

const mapDispatchToProps = dispatch => ({
    onLoad: (props) => {
        if(props.match.params.username){
            dispatch(getUserProfile(props.match.params.username));             
        }
    },
    onUserLoaded: (username) => {
        dispatch(getUserWishes(username)); 
    }
});

class Profile extends Component {

    componentWillMount() {
        this.props.onLoad(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user !== this.props.user){
            this.props.onUserLoaded(nextProps.user.username);
        }
    }

    render() {
        function user(props){
            if(props.user){
                return props.user.username;
            } else {
                return "";
            }
        }

        return (
            <div className="home">
                <div className="wishList">
                    <h2>Wishes for {user(this.props)}</h2>
                    <WishList wishList={this.props.wishList} isCurrentUser={false}/>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);