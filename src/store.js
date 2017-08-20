import { applyMiddleware, createStore, combineReducers } from 'redux';
import { promiseMiddleware, localStorageMiddleware } from './middleware';

import common from './Reducers/common';
import wishes from './Reducers/wishes';
import users from './Reducers/users';

const reducer = combineReducers({
    common,
    wishes,
    users
});

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware);

const store = createStore(reducer, middleware);

export default store;