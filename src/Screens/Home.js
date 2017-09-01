import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

import { getUserWishes } from '../actions'

import { connect } from 'react-redux';

import WishList from '../Components/WishList';

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    wishList: state.wishes.wishList,
    wishesCount: state.wishes.wishesCount
});

const mapDispatchToProps = dispatch => ({
    onLoad: (props) => {
        if(props.currentUser){
            dispatch(getUserWishes());            
        }
    }
});

class Home extends Component {

    componentWillMount() {
        this.props.onLoad(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentUser !== this.props.currentUser){
            this.props.onLoad(nextProps);
        }
    }

    render() {
        function homeBody(props){
            if (props.currentUser) {
                return (
                    <div className="home">
                    <div className="wishList">
                        <h2>{user(props)}</h2>
                        <h4>Your wishes:</h4>
                        <WishList wishList={props.wishList} isCurrentUser={true}/>
                    </div>
                    <div className="addWish">
                        <Link to='/addwish'>Add Wish</Link>
                    </div>
                </div>
                );
            }
            else {
                return (
                    <div className="home">
                        <h2>Welcome to Dillist.</h2>
                    </div>
                );
            }
        }

        function user(props){
            if(props.currentUser){
                return props.currentUser.username;
            } else {
                return "";
            }
        }

        return (
            homeBody(this.props)
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);