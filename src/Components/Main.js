import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import Login from './Login';
import Register from './Register';

class Main extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                </Switch>
            </main>
        );
    }
}

export default Main;