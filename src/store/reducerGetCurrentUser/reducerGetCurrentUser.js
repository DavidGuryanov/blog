const initialState = {
  currentUser: {},
  isLoggedIn: false,
};

function reducerGetCurrentuser(state = initialState, action) {
  switch (action.type) {
    case "GET_USER":
      return {
        currentUser: action.payload.user,
        isLoggedIn: true,
      };

    case "LOGIN":
      return {
        currentUser: action.payload.user,
        isLoggedIn: true,
      };
    case "LOG_OUT":
      return { currentUser: {}, isLoggedIn: false };
    case "UPDATE_USER":
      return {
        currentUser: action.payload.user,
        isLoggedIn: true,
      };

    default:
      return state;
  }
}
export default reducerGetCurrentuser;
