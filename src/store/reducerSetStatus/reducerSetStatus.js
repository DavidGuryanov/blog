const initialState = {
  errors: {},
  ok: false,
  loading: false,
};

function reducerSetStatus(state = initialState, action) {
  switch (action.type) {
    case "HANDLE_ERRORS":
      return { errors: action.payload.errors, ok: false, loading: false };
    case "HANDLE_OK":
      return { errors: {}, ok: true, loading: false };
    case "HANDLE_LOADING":
      return { errors: {}, ok: false, loading: true };

    default:
      return state;
  }
}
export default reducerSetStatus;
