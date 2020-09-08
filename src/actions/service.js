import { checkErrors } from "./actions";
//const local = "http://localhost:3000/";
const web = "https://conduit.productionready.io/";
const urlBase = web;

export default class apiService {
  async apiArticles(offset, token) {
    if (token) {
      return fetch(`${urlBase}api/articles?offset=${offset}&limit=10`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      }).then((response) => {
        return response.json();
      });
    }
    return fetch(`${urlBase}api/articles?offset=${offset}&limit=10`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    }).then((response) => {
      return response.json();
    });
  }
  async apiAuthor(author) {
    return fetch(`${urlBase}api/articles?author=${author}`).then((response) => {
      return response.json();
    });
  }
  async apiDelete(slug, token) {
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
    }).then((response) => {
      return response.json();
    });
  }
  async apiSingleArticle(slug, token, dispatch) {
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
        });
    } else {
      fetch(`${urlBase}api/articles/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      })
        .then((response) => checkErrors(response, dispatch))
        .then((response) => {
          return response.json();
        });
    }
  }
  async apiLogin(email, password, dispatch) {
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
      });
  }
  async apiNewUser(username, email, password, dispatch) {
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
      });
  }
  async apiCurrentUser(token, dispatch) {
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
      });
  }
  async apiUpdateUser(token, username, email, password, image, bio, dispatch) {
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
      });
  }
  async apiNewArticle(token, title, description, text, tags, dispatch) {
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
      });
  }
  async apiUpdateArticle(
    slug,
    token,
    title,
    description,
    text,
    tags,
    dispatch
  ) {
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
      });
  }
  async apiFavourite(slug, token, act, dispatch) {
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
      });
  }
}
