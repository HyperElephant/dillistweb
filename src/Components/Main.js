import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Home from '../Screens/Home';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import AddWish from '../Screens/AddWish';
import AllUsers from '../Screens/AllUsers';
import Profile from '../Screens/Profile';
import Friends from '../Screens/Friends';

const mapStateToProps = state => ({
    redirectTo: state.common.redirectTo,
});

const mapDispatchToProps = dispatch => ({
    onRedirect: () =>
      dispatch({ type: 'REDIRECT' })
  });

class Main extends Component {

    componentWillReceiveProps(nextProps){
        if(nextProps.redirectTo){
            this.props.history.push(nextProps.redirectTo);
            this.props.onRedirect();
        }
    }

    render() {
        return (
            <div className='content'>
                <Switch>
                    <Route exact path='/home' component={Home}/>
                    <Route path='/addwish' component={AddWish}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route exact path='/users' component={AllUsers}/>
                    <Route path="/user/:username" component={Profile} />
                    <Route path='/friends' component={Friends}/>
                </Switch>
            </div>
        );
    }
}

Main.propTypes = {
    history: PropTypes.object,
    redirectTo: PropTypes.string,
    onRedirect: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);