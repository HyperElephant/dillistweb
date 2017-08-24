import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import AddWish from './AddWish';
import UserList from './UserList';
import Profile from './Profile';

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
            <div>
                <Switch>
                    <Route exact path='/home' component={Home}/>
                    <Route path='/addwish' component={AddWish}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route exact path='/users' component={UserList}/>
                    <Route path="/user/:username" component={Profile} />
                </Switch>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);