import User from "../Models/User";

export default (state = {}, action) => {
  switch (action.type) {
    case "GET_USER_LIST":
      return {
        ...state,
        userList: action.payload.users.map(user => {
          return new User(user.username, user.email);
        }),
        userCount: action.payload.userCount
      };
    case "GET_USER_PROFILE":
      return {
        ...state,
        userProfile: action.payload.profile
          ? new User(
              action.payload.profile.username,
              action.payload.profile.email
            )
          : null
      };
    case "GET_FRIENDS":
      return {
        ...state,
        friends: action.payload.friends.map(user => {
          return new User(user.username, user.email);
        })
      };
    default:
      break;
  }
  return state;
};
