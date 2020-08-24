const initialState = {
  articles: [],
  loading: false,
};

function reducerGetArticles(state = initialState, action) {
  switch (action.type) {
    case "GET_ARTICLES":
      if (action.payload) {
        return { articles: action.payload.articles, loading: false };
      }
      return { articles: {}, loading: true };
    default:
      return state;
  }
}
export default reducerGetArticles;
