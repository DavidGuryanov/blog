const initialState = {
  article: {},
  loading: false,
};

function reducerGetSingleArticle(state = initialState, action) {
  switch (action.type) {
    case "GET_SINGLE_ARTICLE":
      if (action.payload === "remove") {
        return { article: {}, loading: false };
      } else if (action.payload) {
        return { article: action.payload, loading: false };
      }
      return { article: {}, loading: true };
    default:
      return state;
  }
}
export default reducerGetSingleArticle;
