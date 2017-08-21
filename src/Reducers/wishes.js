export default (state = {}, action) => {
    switch (action.type) {
        case 'USER_WISHES':
            return {
            ...state,
            wishList: action.payload.wishes,
            wishesCount: action.payload.wishesCount
            };
        case 'REMOVE_WISH':
            return {
                ...state,
                wishesCount: state.wishesCount - 1
            }
        default:
            break;

    }
    return state;
  };
  