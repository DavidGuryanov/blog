const initialState = {
  articles: [],
  articlesByAuthor: [],
  loading: false,
};

function reducerGetArticles(state = initialState, action) {
  switch (action.type) {
    case "GET_ARTICLES":
      if (action.payload) {
        return { ...state, articles: action.payload.articles, loading: false };
      }
      return { ...state, articles: {}, loading: true };
    case "GET_ARTICLES_BY_AUTHOR":
      if (action.payload) {
        console.log(action.payload);
        return {
          ...state,
          articlesByAuthor: action.payload.articles,
          loading: false,
        };
      }
      return { ...state, articlesByAuthor: [], loading: true };
    default:
      return state;
  }
}
export default reducerGetArticles;
