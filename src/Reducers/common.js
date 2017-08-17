const defaultState = {
    token: null,
    currentUser: null
}

export default (state = defaultState, action) => {
    switch (action.type) {
      case 'LOGIN':
      case 'REGISTER':
        return {
          ...state,
          token: action.error ? null : action.payload.user.token,
          currentUser: action.error ? null : action.payload.user
        };
    }
    return state;
  };