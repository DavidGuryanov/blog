const initialState = {
  articles: [],
  articlesByAuthor: [],
  loading: false,
  article: {},
};

function reducerGetArticles(state = initialState, action) {
  switch (action.type) {
    case "GET_SINGLE_ARTICLE":
      console.log(action.payload);
      if (action.payload) {
        return {
          ...state,
          article: action.payload.article,
          loading: false,
        };
      }
      return { ...state, article: {}, loading: true };
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
      return { ...state, articlesByAuthor: {}, loading: true };
    case "LIKE":
      console.log("like");
      let test = [...state.articles];
      const checkIfOwn = test.find((e, i) => {
        if (e.slug === action.slug) {
          return true;
        }
      });
      test[test.indexOf(checkIfOwn)].favorited = true;
      test[test.indexOf(checkIfOwn)].favoritesCount += 1;
      // console.log(test[test.indexOf(checkIfOwn)]);
      if (action.slug) {
        return { ...state, articles: test, loading: false };
      }
      return { ...state };
    case "UNLIKE":
      console.log("unlike");
      let test2 = [...state.articles];
      const checkIfOwn2 = test2.find((e, i) => {
        if (e.slug === action.slug) {
          return true;
        }
      });
      test2[test2.indexOf(checkIfOwn2)].favorited = false;
      test2[test2.indexOf(checkIfOwn2)].favoritesCount -= 1;
      // console.log(test[test.indexOf(checkIfOwn)]);
      if (action.slug) {
        return { ...state, articles: test2, loading: false };
      }
      return { ...state };
    default:
      return state;
  }
}
export default reducerGetArticles;
