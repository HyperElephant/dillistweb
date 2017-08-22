export default (state = {}, action) => {
    switch (action.type) {
        case 'USER_WISHES':
            return {
            ...state,
            wishList: action.payload.wishes,
            wishesCount: action.payload.wishesCount
            };
        default:
            break;

    }
    return state;
  };
  