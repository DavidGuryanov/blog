const initialState = {
  errors: {},
  ok: false,
  loading: false,
};

function reducerSetStatus(state = initialState, action) {
  switch (action.type) {
    case "HANDLE_ERRORS":
      if (action.payload.error) {
        return { errors: { ...action.payload }, ok: false, loading: false };
      } else {
        return {
          errors: { ...action.payload.errors },
          ok: false,
          loading: false,
        };
      }
    case "CLEAR_ERRORS":
      return { errors: {}, ok: false, loading: false };
    case "HANDLE_OK":
      return { errors: {}, ok: true, loading: false };
    case "UNHANDLE_OK":
      return { errors: {}, ok: false, loading: false };
    case "HANDLE_LOADING":
      return { errors: {}, ok: false, loading: true };

    default:
      return state;
  }
}
export default reducerSetStatus;
