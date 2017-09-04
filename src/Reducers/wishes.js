import {
    USER_WISHES,
    CLAIMED_WISHES
  } from '../actions';

import Wish from '../Models/Wish';

export default (state = {}, action) => {
    switch (action.type) {
        case USER_WISHES:
            return {
            ...state,
            wishList: action.payload.wishes.map((wish) => { return new Wish(wish.is, wish.title, wish.url)}),
            wishesCount: action.payload.wishesCount
            };
        case CLAIMED_WISHES:
            return {
            ...state,
            claimedWishes: action.payload.wishes.map((wish) => { return new Wish(wish.is, wish.title, wish.url)}),
            claimedWishesCount: action.payload.wishesCount
            };
        default:
            break;

    }
    return state;
  };
  