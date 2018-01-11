import { LOGIN, REGISTER, APP_LOAD, LOGOUT, checkStatus } from "../actions";

import User from "../Models/User";

const defaultState = {
  token: null,
  currentUser: null,
  friends: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return checkStatus(
        action,
        //Success
        action => {
          return {
            ...state,
            token: action.token || null,
            appLoaded: true,
            currentUser:
              action.payload && action.payload.user
                ? new User(
                    action.payload.user.username,
                    action.payload.user.email
                  )
                : null
          };
        },
        //Error
        action => {
          return {};
        },
        //Pending
        action => {
          return {
            ...state,
            appLoadPending: true
          };
        }
      );
      break;
    case LOGIN:
    case REGISTER:
      return checkStatus(
        action,
        //Success
        action => {
          console.log("success");
          return {
            ...state,
            token: action.error ? null : action.payload.user.token,
            currentUser:
              action.payload && action.payload.user
                ? new User(
                    action.payload.user.username,
                    action.payload.user.email
                  )
                : null,
            redirectTo: "/home"
          };
        },
        //Error
        action => {
          return {};
        },
        //Pending
        action => {
          return {
            loginPending: true
          };
        }
      );
      break;
    case "REDIRECT":
      return { ...state, redirectTo: null };
    case LOGOUT:
      return {
        ...state,
        token: null,
        currentUser: null,
        redirectTo: "/home"
      };
    default:
      break;
  }
  return state;
};
