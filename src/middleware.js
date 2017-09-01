import fetcher from './fetcher';

import { REGISTER, LOGIN, LOGOUT } from './actions';

const promiseMiddleware = store => next => action => {
  console.log(action);
  if (isPromise(action.payload)) {
    action.payload.then(
      res => {
        action.payload = res;
        store.dispatch(action);
      },
      error => {
        action.error = true;
        action.payload = error.response.body;
        store.dispatch(action);
      }
    );

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