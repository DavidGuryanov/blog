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

export const login = (userInfo) => {
  return { type: "LOGIN", payload: userInfo };
};

export function fetchLogin(credentials) {
  return (dispatch) => {
    dispatch(login());
    const { email, password } = credentials;
    return fetch(`https://conduit.productionready.io/api/users/login`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    })
      .then((response) => {
        console.log(response.json());
        return response.json();
      })
      .then((json) => dispatch(login(json)));
  };
}

export const createUser = (userInfo) => {
  return { type: "CREATE_USER", payload: userInfo };
};
export function fetchNewUser(credentials) {
  return (dispatch) => {
    dispatch(createUser());
    const { username, email, password } = credentials;
    return fetch(`https://conduit.productionready.io/api/users`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        user: {
          username: username,
          email: email,
          password: password,
        },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => dispatch(createUser(json)));
  };
}
