import { applyMiddleware, createStore, combineReducers } from 'redux';
import { promiseMiddleware, localStorageMiddleware } from './middleware';

import common from './Reducers/common';
import wishes from './Reducers/wishes';

const reducer = combineReducers({
    common,
    wishes
});

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware);

const store = createStore(reducer, middleware);

export default store;