import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './Home';
import Login from './Login';
import Register from './Register';

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
                    <Route path='/home' component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                </Switch>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);