import { createStore, combineReducers } from 'redux';

import common from './Reducers/common';

const reducer = combineReducers({
    common
});

const store = createStore(reducer);

export default store;