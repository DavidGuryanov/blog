const local = "http://localhost:3000/";
const web = "https://conduit.productionready.io/";
const urlBase = web;

function checkErrors(response, dispatch) {
  if (!response.ok) {
    console.log(response);
    response.json().then((json) => {
      console.log(json);
      return dispatch(setStatus(json));
    });
    throw Error(response.statusText);
  } else if (response.ok) {
    return response;
  }
}

export function setStatus(status) {
  if (status === "ok") {
    return { type: "HANDLE_OK" };
  } else if (status === "loading") {
    return { type: "HANDLE_LOADING" };
  }
  return { type: "HANDLE_ERRORS", payload: status };
}

export const getArticles = (array) => {
  return { type: "GET_ARTICLES", payload: array };
};

export function fetchArticles(offset = 0) {
  return (dispatch) => {
    dispatch(getArticles());
    return fetch(`${urlBase}api/articles?offset=${offset}&limit=10`)
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
    return fetch(`${urlBase}api/articles/${slug}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => dispatch(getSingleArticle(json)));
  };
}

export function fetchLogin(credentials) {
  return (dispatch) => {
    dispatch(setStatus("loading"));
    const { email, password } = credentials;
    return fetch(`${urlBase}api/users/login`, {
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
      .then((response) => checkErrors(response, dispatch))
      .then((response) => {
        return response.json();
      })

      .then((json) => {
        dispatch({ type: "LOGIN", payload: json });
        return dispatch(setStatus("ok"));
      })
      .catch((error) => console.log("error", error));
  };
}

export function fetchNewUser(credentials) {
  return (dispatch) => {
    dispatch(setStatus("loading"));
    const { username, email, password } = credentials;
    return fetch(`${urlBase}api/users`, {
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
      .then((response) => checkErrors(response, dispatch))
      .then((response) => {
        return response.json();
      })

      .then((json) => {
        dispatch({ type: "CREATE_USER", payload: json });
        return dispatch(fetchCurrentUser(json));
      })
      .catch((error) => console.log("error", error));
  };
}

export function fetchCurrentUser(user) {
  const { email, token, username } = user.user;
  return (dispatch) => {
    dispatch(setStatus("loading"));
    return fetch(`${urlBase}api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((response) => checkErrors(response, dispatch))
      .then((response) => {
        return response.json();
      })

      .then((json) => {
        dispatch({ type: "GET_USER", payload: json });
        return dispatch(setStatus("ok"));
      })
      .catch((error) => console.log("error", error));
  };
}

export const logOut = () => {
  return { type: "LOG_OUT" };
};

export function updateCurrentUser(user) {
  const { email, username, password, image, bio, token } = user;
  return (dispatch) => {
    dispatch(setStatus("loading"));
    return fetch(`${urlBase}api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        user: {
          username: username,
          email: email,
          password: password,
          image: image,
          bio: bio,
          token: token,
        },
      }),
    })
      .then((response) => checkErrors(response, dispatch))
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        //return dispatch(updUser(json));
        dispatch({ type: "UPDATE_USER", payload: json });
        return dispatch(setStatus("ok"));
      })
      .catch((error) => console.log("error", error));
  };
}

export const newArticle = (article) => {
  if (article.errors) {
    return { type: "CREATE_ARTICLE", error: article };
  }
  return { type: "CREATE_ARTICLE", payload: article };
};

export function createNewArticle(article, token) {
  console.log(article);
  const { title, description, text, tags } = article;
  return (dispatch) => {
    return fetch(`${urlBase}api/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        article: {
          title: title,
          description: description,
          body: text,
          tagList: tags,
        },
      }),
    })
      .then((response) => checkErrors(response, dispatch))
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return dispatch(newArticle(json));
      })
      .catch((error) => console.log("error", error));
  };
}
