import {
  LOGIN,
  REGISTER,
  APP_LOAD,
  LOGOUT,
} from '../actions';

const defaultState = {
    token: null,
    currentUser: null
}

export default (state = defaultState, action) => {
    switch (action.type) {
      case APP_LOAD:
        return {
          ...state,
          token: action.token || null,
          appLoaded: true,
          currentUser: action.payload ? action.payload.user : null
        };
      case LOGIN:
      case REGISTER:
        return {
          ...state,
          token: action.error ? null : action.payload.user.token,
          currentUser: action.error ? null : action.payload.user,
          redirectTo: '/home'
        };
      case 'REDIRECT':
        return { ...state, redirectTo: null };
      case LOGOUT:
        return {
          ...state,
          token: null,
          currentUser: null,
          redirectTo: '/home'
        };
      default:
        break;
    }
    return state;
  };