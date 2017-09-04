import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserWishes, getClaimedWishes } from '../actions'

import User from '../Models/User';
import Wish from '../Models/Wish';
import WishList from '../Components/WishList';


const CLAIMED_WISHES = "CLAIMED_WISHES";
const WISHES = "WISHES";

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    wishList: state.wishes.wishList,
    wishesCount: state.wishes.wishesCount,
    claimedWishes: state.wishes.claimedWishes,
    claimedWishesCount: state.wishes.claimedWishesCount
});

const mapDispatchToProps = dispatch => ({
    onLoad: (props) => {
        if(props.currentUser){
            dispatch(getUserWishes());   
            dispatch(getClaimedWishes());         
        }
    }
});

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            viewing: WISHES
        }

        this.handleViewToggle = this.handleViewToggle.bind(this); 
    }

    componentWillMount() {
        this.props.onLoad(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentUser !== this.props.currentUser){
            this.props.onLoad(nextProps);
        }
    }

    handleViewToggle() {
        var newViewing = WISHES;
        if(this.state.viewing === WISHES){
            newViewing = CLAIMED_WISHES;
        }
        this.setState({
          viewing: newViewing
        });
      }

    render() {

        const handler = this.handleViewToggle;

        function wishesOrClaimed(props, viewing){
            if(viewing === WISHES){
                return(<div>
                    <h4>Your wishes:</h4>
                    <WishList wishList={props.wishList} isCurrentUser={true}/>
                    </div>);
            } else if (viewing === CLAIMED_WISHES){
                return(<div>
                    <h4>Claimed wishes:</h4>
                    <WishList wishList={props.claimedWishes} isCurrentUser={true}/>
                    </div>);
            }
        }

        function viewToggle(viewing){
            var buttonText = "View Your Wishes";
            if(viewing === WISHES){
                buttonText = "View Claimed Wishes";
            }

            return(
                <div>
                    <button onClick={() => handler()}>
                        {buttonText}
                    </button>
                </div>
            );

        }

        function homeBody(props, state){
            if (props.currentUser) {
                return (
                    <div className="home">
                        <h2>{user(props)}</h2>
                        <div className="add-wish">
                            <Link to='/addwish'>Add Wish</Link>
                        </div>
                        {viewToggle(state.viewing)}
                    <div className="wishList">
                        {wishesOrClaimed(props, state.viewing)}
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
            homeBody(this.props, this.state)
        );
    }
}

Home.propTypes = {
    currentUser: PropTypes.instanceOf(User),
    wishList: PropTypes.arrayOf(PropTypes.instanceOf(Wish)),
    wishesCount: PropTypes.number,
    claimedWishes: PropTypes.arrayOf(PropTypes.instanceOf(Wish)),
    claimedWishesCount: PropTypes.number,

    onLoad: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);