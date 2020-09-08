import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import CreateArticle from "../create-article/createArticle";

const EditArticle = ({ user, ok, isLoggedIn, slug, ownArticles }) => {
  const [currentArticle] = useState(
    ownArticles.find((e, i) => {
      if (e.slug === slug && isLoggedIn) {
        return true;
      }
      return false;
    })
  );
  if (
    currentArticle === undefined ||
    !isLoggedIn ||
    ok ||
    user.username !== currentArticle.author.username
  ) {
    return <Redirect to="/" />;
  }
  return <CreateArticle ownArticles={ownArticles} slug={slug} />;
};

const mapStateToProps = (state) => {
  return {
    ownArticles: [...state.reducerGetArticles.articlesByAuthor],
    user: { ...state.reducerGetCurrentuser.currentUser },
    ok: state.reducerSetStatus.ok,
    isLoggedIn: state.reducerGetCurrentuser.isLoggedIn,
  };
};

export default connect(mapStateToProps)(EditArticle);
