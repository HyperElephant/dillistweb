import React, { Component } from 'react';
import './App.css';
import {Route, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import { appLoad } from './actions';

import Header from './Components/Header';
import Main from './Components/Main';

const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
});

const mapDispatchToProps = dispatch => ({
  onLoad: (token) =>
    dispatch(appLoad(token))
});

class App extends Component {
  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    this.props.onLoad(token);
  }

  render() {
    return (
      <div>
        <Header/>
        <Route component={Main}/>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
