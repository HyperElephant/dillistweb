import { createStore, combineReducers } from 'redux';

import common from './reducers/common';

const reduer = combineReducers({
    common
});

const store = createStore(reducer);

export default store;