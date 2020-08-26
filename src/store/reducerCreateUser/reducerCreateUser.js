const initialState = {
  user: {},
  loading: false,
};

function reducerCreateUser(state = initialState, action) {
  switch (action.type) {
    case "CREATE_USER":
      if (action.payload) {
        console.log(action.payload);
        return { user: action.payload, loading: false };
      }
      return { user: {}, loading: true };
    default:
      return state;
  }
}
export default reducerCreateUser;
