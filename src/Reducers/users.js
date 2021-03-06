import User from "../Models/User";
import { checkStatus } from "../actions";
import { bindActionCreators } from "redux";

export default (state = {}, action) => {
  switch (action.type) {
    case "GET_USER_LIST":
      return checkStatus(
        action,
        //Success
        action => {
          return {
            ...state,
            userList: action.payload.users.map(user => {
              return new User(user.username, user.email);
            }),
            userCount: action.payload.userCount
          };
        },
        //Error
        action => {
          return {
            ...state,
            getUserListError: true
          };
        },
        //Pending
        action => {
          return {
            ...state,
            gettingUserList: true
          };
        }
      );
      break;
    case "GET_USER_PROFILE":
      return checkStatus(
        action,
        //Success
        action => {
          return {
            ...state,
            userProfile: action.payload.profile
              ? new User(
                  action.payload.profile.username,
                  action.payload.profile.email
                )
              : null
          };
        },
        //Error
        action => {
          return {
            ...state,
            getUserProfileError: true
          };
        },
        //Pending
        action => {
          return {
            ...state,
            gettingUserList: true
          };
        }
      );
      break;
    case "GET_FRIENDS":
      return checkStatus(
        action,
        //Success
        action => {
          return {
            ...state,
            friends: action.payload.friends.map(user => {
              return new User(user.username, user.email);
            })
          };
        },
        //Error
        action => {
          return {
            ...state,
            getFriendsError: true
          };
        },
        //Pending
        action => {
          return {
            ...state,
            gettingFriends: true
          };
        }
      );
      break;
    default:
      break;
  }
  return state;
};
