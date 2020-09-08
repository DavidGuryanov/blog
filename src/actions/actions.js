import apiService from "./service";

const api = new apiService();

export function checkErrors(response, dispatch) {
  if (!response.ok) {
    console.log(response);
    response.json().then((json) => {
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
  } else if (status === "unok") {
    return { type: "UNHANDLE_OK" };
  } else if (status === "loading") {
    return { type: "HANDLE_LOADING" };
  }
  return (dispatch) => {
    dispatch({ type: "HANDLE_ERRORS", payload: status });
    dispatch({ type: "CLEAR_ERRORS" });
  };
}

export const getArticles = (array) => {
  return { type: "GET_ARTICLES", payload: array };
};
export function fetchArticles(offset = 0, token) {
  return (dispatch) => {
    dispatch(getArticles());
    return api.apiArticles(offset, token).then((json) => {
      dispatch(getArticles(json));
    });
  };
}
export const getArticlesByAuthor = (array) => {
  return { type: "GET_ARTICLES_BY_AUTHOR", payload: array };
};
export function fetchArticlesByAuthor(author) {
  return (dispatch) => {
    return api.apiAuthor(author).then((json) => {
      dispatch(getArticlesByAuthor(json));
    });
  };
}
export function deleteArticle(slug, author, token) {
  return (dispatch) => {
    dispatch(setStatus("loading"));
    return api
      .apiDelete(slug, token)
      .then((json) => {
        dispatch(fetchArticlesByAuthor(author));
        dispatch(setStatus("ok"));
        setTimeout(() => {
          dispatch(setStatus("unok"));
        }, 1000);
      })
      .catch((error) => console.log("error", error));
  };
}
export function fetchSingleArticle(slug, token) {
  return (dispatch) => {
    dispatch({ type: "GET_SINGLE_ARTICLE" });
    return api
      .apiSingleArticle(slug, token, dispatch)
      .then((json) => dispatch({ type: "GET_SINGLE_ARTICLE", payload: json }))
      .catch((error) => console.log("error", error));
  };
}

export function fetchLogin(credentials) {
  return (dispatch) => {
    dispatch(setStatus("loading"));
    const { email, password } = credentials;
    return api
      .apiLogin(email, password, dispatch)
      .then((json) => {
        dispatch({ type: "LOGIN", payload: json });
        dispatch(fetchArticlesByAuthor(json.user.username));
        dispatch(setStatus("ok"));
        setTimeout(() => {
          dispatch(setStatus("unok"));
        }, 1000);
      })
      .catch((error) => console.log("error", error));
  };
}
export function fetchNewUser(credentials) {
  return (dispatch) => {
    dispatch(setStatus("loading"));
    const { username, email, password } = credentials;
    return api
      .apiNewUser(username, email, password, dispatch)
      .then((json) => {
        dispatch({ type: "CREATE_USER", payload: json });
        return dispatch(fetchCurrentUser(json));
      })
      .catch((error) => console.log("error", error));
  };
}
export function fetchCurrentUser(user) {
  const { token } = user.user;
  return (dispatch) => {
    dispatch(setStatus("loading"));
    return api
      .apiCurrentUser(token, dispatch)

      .then((json) => {
        dispatch({ type: "GET_USER", payload: json });
        dispatch(fetchArticlesByAuthor(json.user.username));
        dispatch(setStatus("ok"));
        setTimeout(() => {
          dispatch(setStatus("unok"));
        }, 1000);
      })
      .catch((error) => console.log("error", error));
  };
}
export const logOut = () => {
  return (dispatch) => {
    dispatch({ type: "LOG_OUT" });
  };
};
export function updateCurrentUser(user) {
  const { email, username, password, image, bio, token } = user;
  return (dispatch) => {
    dispatch(setStatus("loading"));
    return api
      .apiUpdateUser(token, username, email, password, image, bio, dispatch)
      .then((json) => {
        //return dispatch(updUser(json));
        dispatch({ type: "UPDATE_USER", payload: json });
        dispatch(setStatus("ok"));
        setTimeout(() => {
          dispatch(setStatus("unok"));
        }, 1000);
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
export function createNewArticle(article, token, username) {
  const { title, description, text, tags } = article;
  return (dispatch) => {
    dispatch(setStatus("loading"));
    return api
      .apiNewArticle(token, title, description, text, tags, dispatch)
      .then((json) => {
        dispatch(fetchArticlesByAuthor(username));
        dispatch({ type: "CREATE_ARTICLE", payload: json });
        dispatch(setStatus("ok"));
        setTimeout(() => {
          dispatch(setStatus("unok"));
        }, 1000);
      })
      .catch((error) => console.log("error", error));
  };
}
export function updateArticle(article, token, username, slug) {
  const { title, description, text, tags } = article;
  return (dispatch) => {
    dispatch(setStatus("loading"));
    return api
      .apiUpdateArticle(slug, token, title, description, text, tags, dispatch)
      .then((json) => {
        dispatch(fetchArticlesByAuthor(username));
        dispatch(setStatus("ok"));
        setTimeout(() => {
          dispatch(setStatus("unok"));
        }, 1000);
      })
      .catch((error) => console.log("error", error));
  };
}
export function favoriteArticle(token, slug, act) {
  return (dispatch) => {
    if (act === "POST") {
      dispatch({ type: "LIKE", slug: slug });
    } else {
      dispatch({ type: "UNLIKE", slug: slug });
    }
    return api
      .apiFavourite(slug, token, act, dispatch)
      .then((json) => {
        // dispatch({ type: "LIKE", slug: slug });
        //dispatch(fetchArticles(0, token));
      })
      .catch((error) => console.log("error", error));
  };
}
