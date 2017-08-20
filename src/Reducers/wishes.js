export default (state = {}, action) => {
    switch (action.type) {
        case 'CURRENT_USER_WISHES':
            return {
            ...state,
            wishList: action.payload.wishes,
            wishCount: action.payload.wishesCount
            };
        default:
            break;

    }
    return state;
  };
  