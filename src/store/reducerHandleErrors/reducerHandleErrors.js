const initialState = {
  errors: {},
};

function reducerHandleErrors(state = initialState, action) {
  switch (action.type) {
    case "HANDLE_ERRORS":
      return { errors: action.payload.errors };
    default:
      return state;
  }
}
export default reducerHandleErrors;
