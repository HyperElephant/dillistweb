export default (state = {}, action) => {
    switch (action.type) {
        case 'GET_USER_LIST':
            return {
                ...state,
                userList: action.payload.users,
                userCount: action.payload.userCount
            };
        case 'GET_USER_PROFILE':
            return {
                ...state,
                userProfile: action.payload.profile
            };
        case 'GET_FRIENDS':
            return {
                ...state,
                friends: action.payload.friends
            };
        default:
            break;

    }
    return state;
  };