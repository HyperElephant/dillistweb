import React, { Component } from 'react';
import '../App.css';

import { getUserWishes, getUserProfile } from '../actions'

import { connect } from 'react-redux';

import WishList from './WishList';


const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    wishList: state.common.userWishList,
    user: state.users.userProfile
});

const mapDispatchToProps = dispatch => ({
    onLoad: (props) => {
        console.log(props);
        if(props.match.params.username){
            dispatch(getUserProfile(props.match.params.username));
            dispatch(getUserWishes(props.match.params.username));              
        }
    }
});

class Profile extends Component {

    componentWillMount() {
        this.props.onLoad(this.props);
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
                    <WishList wishList={this.props.wishList}/>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);