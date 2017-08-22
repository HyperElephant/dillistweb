import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

import { getUserWishes } from '../actions'

import { connect } from 'react-redux';

import WishList from './WishList';

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

    componentWillReceiveProps(newProps) {
        if(newProps.wishesCount && newProps.wishesCount !== this.props.wishesCount){
            this.props.onLoad(newProps);
        }
    }

    render() {
        function user(props){
            if(props.currentUser){
                return props.currentUser.username;
            } else {
                return "";
            }
        }

        return (
            <div className="home">
                <div className="wishList">
                    <h2>{user(this.props)}</h2>
                    <h4>Your wishes:</h4>
                    <WishList wishList={this.props.wishList} isCurrentUser={true}/>
                </div>
                <div className="addWish">
                    <Link to='/addwish'>Add Wish</Link>
                </div>
                
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);