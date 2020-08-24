export const login = () => {
  return { type: "LOGIN" };
};
export const getArticles = (array) => {
  return { type: "GET_ARTICLES", payload: array };
};

export function fetchArticles(offset = 0) {
  return (dispatch) => {
    dispatch(getArticles());
    return fetch(
      `https://conduit.productionready.io/api/articles?offset=${offset}&limit=10`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => dispatch(getArticles(json)));
  };
}
export const getSingleArticle = (article) => {
  return { type: "GET_SINGLE_ARTICLE", payload: article };
};

export function fetchSingleArticle(slug) {
  return (dispatch) => {
    dispatch(getSingleArticle());
    return fetch(`https://conduit.productionready.io/api/articles/${slug}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => dispatch(getSingleArticle(json)));
  };
}
