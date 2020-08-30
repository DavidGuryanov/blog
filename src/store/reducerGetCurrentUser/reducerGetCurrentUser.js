const initialState = {
  currentUser: {},
  loading: false,
  errors: false,
};

function reducerGetCurrentuser(state = initialState, action) {
  switch (action.type) {
    case "GET_USER":
      console.log(action.payload);
      if (action.payload) {
        console.log(action.payload);
        return {
          currentUser: action.payload.user,
          loading: false,
          isLoggedIn: true,
        };
      }
      return { currentUser: {}, loading: true, isLoggedIn: false };
    case "LOGIN":
      if (action.payload) {
        return {
          currentUser: action.payload.user,
          loading: false,
          isLoggedIn: true,
          errors: {},
        };
      }
      return {
        currentUser: {},
        loading: false,
        isLoggedIn: false,
        errors: action.error,
      };

    case "LOG_OUT":
      return { currentUser: {}, loading: false, isLoggedIn: false };
    case "UPDATE_USER":
      if (action.payload) {
        return {
          currentUser: action.payload.user,
          loading: false,
          isLoggedIn: true,
        };
      }
      return {
        ...state,
        errors: action.error,
      };

    default:
      return state;
  }
}
export default reducerGetCurrentuser;
