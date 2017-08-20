import React, { Component } from 'react';
import '../App.css';

import { getCurrentUserWishes } from '../actions'

import { connect } from 'react-redux';

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    wishes: state.wishes.wishList
});

const mapDispatchToProps = dispatch => ({
    onLoad: (props) => {
        if(props.currentUser){
            dispatch(getCurrentUserWishes());            
        }
    }
});

class Home extends Component {

    componentWillMount() {
        this.props.onLoad(this.props);
    }

    render() {
    function wishes(props) {
        if(props.wishes){
            props.wishes.map(function(wish){
                return <li>{wish}</li>;
            });
        } else {
            return <p>No Wishes</p>;
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
        <div className="home">
            <h2>Wishes for {user(this.props)}</h2>
            <ul>
                {wishes(this.props)}
            </ul>
        </div>
    );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);