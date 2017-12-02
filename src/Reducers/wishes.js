import { USER_WISHES, CLAIMED_WISHES, checkStatus } from "../actions";

import Wish from "../Models/Wish";

export default (state = {}, action) => {
  switch (action.type) {
    case USER_WISHES:
      checkStatus(
        action,
        //Success
        action => {
          return {
            ...state,
            wishList: action.payload.wishes.map(wish => {
              return new Wish(wish.id, wish.title, wish.url);
            }),
            wishesCount: action.payload.wishesCount
          };
        },
        //Error
        action => {
          return {
            ...state,
            getUserWishesError: true
          };
        },
        //Pending
        action => {
          return {
            ...state,
            gettingUserWishes: true
          };
        }
      );
    case CLAIMED_WISHES:
      checkStatus(
        action,
        //Success
        action => {
          return {
            ...state,
            claimedWishes: action.payload.wishes.map(wish => {
              return new Wish(wish.id, wish.title, wish.url);
            }),
            claimedWishesCount: action.payload.wishesCount
          };
        },
        //Error
        action => {
          return {
            ...state,
            getClaimedWishesError: true
          };
        },
        //Pending
        action => {
          return {
            ...state,
            gettingClaimedWishes: true
          };
        }
      );
    default:
      break;
  }
  return state;
};
