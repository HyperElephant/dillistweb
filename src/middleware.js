import fetcher from './fetcher';

import { REGISTER, LOGIN, LOGOUT } from './actions';

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch(action);
    action.payload.then(
      res => {
        console.log("Res: " + res);
        action.payload = res;
        store.dispatch(action);
      },
      error => {
        console.log("Error: " + error);
        action.error = true;
        action.payload = error.response.body;
        store.dispatch(action);
      }
    );

    var startAction = { type: action.type };
    store.dispatch(startAction);
    return;
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}

const localStorageMiddleware = store => next => action => {
  if (action.type === REGISTER || action.type === LOGIN) {
    if(!action.error) {
      window.localStorage.setItem('jwt', action.payload.user.token);
      fetcher.setToken(action.payload.user.token);
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem('jwt', '');
    fetcher.setToken(null);
  }
  next(action);
};

export {
  localStorageMiddleware,
  promiseMiddleware
};