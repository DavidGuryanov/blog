const initialState = {
  articles: [],
  articlesByAuthor: [],
  loading: false,
  article: {},
};

function reducerGetArticles(state = initialState, action) {
  let arr;
  let checkIfOwn;
  switch (action.type) {
    case "GET_SINGLE_ARTICLE":
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
        return {
          ...state,
          articles: action.payload.articles,
          loading: false,
          article: {},
        };
      }
      return { ...state, articles: {}, loading: true, article: {} };
    case "GET_ARTICLES_BY_AUTHOR":
      if (action.payload) {
        return {
          ...state,
          articlesByAuthor: action.payload.articles,
          loading: false,
        };
      }
      return { ...state, articlesByAuthor: {}, loading: true, article: {} };
    case "LIKE":
      if (action.slug && state.article.title) {
        arr = { ...state.article };
        arr.favorited = true;
        arr.favoritesCount += 1;
        return { ...state, article: arr, loading: false };
      } else if (action.slug) {
        arr = [...state.articles];
        checkIfOwn = arr.find((e, i) => {
          if (e.slug === action.slug) {
            return true;
          }
          return false;
        });
        arr[arr.indexOf(checkIfOwn)].favorited = true;
        arr[arr.indexOf(checkIfOwn)].favoritesCount += 1;
        return { ...state, articles: arr, loading: false };
      }
      return { ...state };
    case "UNLIKE":
      if (action.slug && state.article.title) {
        arr = { ...state.article };
        arr.favorited = false;
        arr.favoritesCount -= 1;
        return { ...state, article: arr, loading: false };
      } else if (action.slug) {
        arr = [...state.articles];
        checkIfOwn = arr.find((e, i) => {
          if (e.slug === action.slug) {
            return true;
          }
          return false;
        });
        arr[arr.indexOf(checkIfOwn)].favorited = false;
        arr[arr.indexOf(checkIfOwn)].favoritesCount -= 1;
        return { ...state, articles: arr, loading: false };
      }
      return { ...state };
    case "LOG_OUT": {
      state.articles.forEach((element) => {
        element.favorited = false;
      });
      return {
        articlesByAuthor: [],
        ...state,
        articles: state.articles,
        loading: false,
      };
    }
    default:
      return state;
  }
}
export default reducerGetArticles;
