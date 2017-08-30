import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFriends } from '../actions';

import UserPreview from '../Components/UserPreview';

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
        function friends(props) {
            if (!props.friends) {
                return (<div>Loading...</div>);
            }
            else if (props.friends.length === 0) {
                return (<div>No friends... :(</div>);
            }
            else {
                return(
                    props.friends.map((user, i) => {
                        return (<UserPreview key={i} user={user}/>)
                    })
                )
            }
        }

        return (
            <div className="user-list">
            <h2>Friends:</h2>
            {
                friends(this.props)
            }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);