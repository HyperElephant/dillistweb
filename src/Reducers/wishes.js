import {
    USER_WISHES,
    CLAIMED_WISHES
  } from '../actions';

export default (state = {}, action) => {
    switch (action.type) {
        case USER_WISHES:
            return {
            ...state,
            wishList: action.payload.wishes,
            wishesCount: action.payload.wishesCount
            };
        case CLAIMED_WISHES:
            return {
            ...state,
            claimedWishes: action.payload.wishes,
            claimedWishesCount: action.payload.wishesCount
            };
        default:
            break;

    }
    return state;
  };
  