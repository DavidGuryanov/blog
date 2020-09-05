//const local = "http://localhost:3000/";
const web = "https://conduit.productionready.io/";
const urlBase = web;

function checkErrors(response, dispatch) {
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
    if (token) {
      return fetch(`${urlBase}api/articles?offset=${offset}&limit=10`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => dispatch(getArticles(json)));
    }
    return fetch(`${urlBase}api/articles?offset=${offset}&limit=10`)
      .then((response) => {
        return response.json();
      })
      .then((json) => dispatch(getArticles(json)));
  };
}
export const getArticlesByAuthor = (array) => {
  return { type: "GET_ARTICLES_BY_AUTHOR", payload: array };
};
export function fetchArticlesByAuthor(author) {
  return (dispatch) => {
    return fetch(`${urlBase}api/articles?author=${author}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        dispatch(getArticlesByAuthor(json));
      });
  };
}
export function deleteArticle(slug, author, token) {
  return (dispatch) => {
    dispatch(setStatus("loading"));
    return fetch(`${urlBase}api/articles/${slug}`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Token ${token}`,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((response) => {
        return response.json();
      })
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
    if (token) {
      return fetch(`${urlBase}api/articles/${slug}`, {
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
        .then((json) => dispatch({ type: "GET_SINGLE_ARTICLE", payload: json }))
        .catch((error) => console.log("error", error));
    }
    return fetch(`${urlBase}api/articles/${slug}`)
      .then((response) => checkErrors(response, dispatch))
      .then((response) => {
        return response.json();
      })
      .then((json) => dispatch({ type: "GET_SINGLE_ARTICLE", payload: json }))
      .catch((error) => console.log("error", error));
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
  const { token } = user.user;
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
    return fetch(`${urlBase}api/articles/${slug}`, {
      method: "PUT",
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
    return fetch(`${urlBase}api/articles/${slug}/favorite`, {
      method: act,
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
        // dispatch({ type: "LIKE", slug: slug });
        //dispatch(fetchArticles(0, token));
      })
      .catch((error) => console.log("error", error));
  };
}
