const local = "http://localhost:3000/";
const web = "https://conduit.productionready.io/";
const urlBase = local;

function checkErrors(response, dispatch) {
  if (!response.ok) {
    response.json().then((json) => {
      return dispatch(handleErrors(json));
    });
    throw Error(response.statusText);
  } else if (response.ok) {
    return response;
  }
}

export const handleErrors = (errors) => {
  return { type: "HANDLE_ERRORS", payload: errors };
};

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
export const login = (userInfo) => {
  return { type: "LOGIN", payload: userInfo };
};

export function fetchLogin(credentials) {
  return (dispatch) => {
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
        return dispatch(login(json));
      })
      .catch((error) => console.log("error", error));
  };
}

export const createUser = (userInfo) => {
  return { type: "CREATE_USER", payload: userInfo };
};
export function fetchNewUser(credentials) {
  return (dispatch) => {
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
        dispatch(createUser(json));
        return dispatch(fetchCurrentUser(json));
      })
      .catch((error) => console.log("error", error));
  };
}
export const getUser = (user) => {
  return { type: "GET_USER", payload: user };
};

export function fetchCurrentUser(user) {
  const { email, token, username } = user.user;
  return (dispatch) => {
    dispatch(getUser());
    return fetch(`${urlBase}api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((response) => checkErrors(response, dispatch))
      .then((response) => {
        return response.json();
      })

      .then((json) => {
        return dispatch(getUser(json));
      })
      .catch((error) => console.log("error", error));
  };
}

export const logOut = () => {
  return { type: "LOG_OUT" };
};
export const updUser = (info) => {
  if (info.errors) {
    return { type: "UPDATE_USER", error: info };
  }
  return { type: "UPDATE_USER", payload: info };
};
export function updateCurrentUser(user) {
  const { email, username, password, image, bio, token } = user;
  return (dispatch) => {
    return fetch(`${urlBase}api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
        return dispatch(updUser(json));
      })
      .catch((error) => console.log("error", error));
  };
}
