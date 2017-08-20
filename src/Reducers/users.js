export default (state = {}, action) => {
    switch (action.type) {
        case 'GET_USER_LIST':
            return {
            ...state,
            userList: action.payload.users,
            userCount: action.payload.userCount
            };
        default:
            break;

    }
    return state;
  };