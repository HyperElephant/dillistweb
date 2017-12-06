import fetcher from "./fetcher";
import { SUCCESS, ERROR, PENDING } from "./actions";

import { REGISTER, LOGIN, LOGOUT } from "./actions";

const promiseMiddleware = store => next => action => {
  console.log("Action Status: ");
  console.log(action.status);
  if (isPromise(action.payload)) {
    var startAction = {
      type: action.type,
      status: PENDING
    };
    store.dispatch(startAction);

    action.payload.then(
      res => {
        console.log("Result:");
        console.log(res);
        if (res.errors) {
          action.status = ERROR;
        } else {
          action.status = SUCCESS;
        }
        action.payload = res;
        setTimeout(store.dispatch(action), 10000);
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
  return v && typeof v.then === "function";
}

const localStorageMiddleware = store => next => action => {
  if (
    action.status === SUCCESS &&
    (action.type === REGISTER || action.type === LOGIN)
  ) {
    if (!action.error) {
      window.localStorage.setItem("jwt", action.payload.user.token);
      fetcher.setToken(action.payload.user.token);
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem("jwt", "");
    fetcher.setToken(null);
  }
  next(action);
};

export { localStorageMiddleware, promiseMiddleware };
