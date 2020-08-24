import React from "react";
import NavBar from "../nav-bar/navBar";
import SignIn from "../sign-in/signIn";
import SignUp from "../sign-up/signUp";
import EditAccount from "../edit-account/editAccount";
import Article from "../article/article";
import ArticleList from "../article-list/articleList";
import CreateArticle from "../create-article/createArticle";
import EditArticle from "../edit-article/editArticle";
import { connect } from "react-redux";
import * as styles from "../main-page/mainPage.module.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
const test = {
  author: { username: "Timo Harmonen", bio: "", image: "", following: false },
  body: "## catch the big fish!",
  createdAt: "2020-08-23T15:17:37.953Z",
  description: "fishing",
  favorited: false,
  favoritesCount: 2,
  slug: "wanna-go-fishing-2j6oyx",
  tagList: [],
  title: "Wanna go fishing",
  updatedAt: "2020-08-23T15:17:37.953Z",
};

const MainPage = (props) => {
  const { articles } = props;
  if (articles) {
    return (
      <div className={styles.main}>
        <Router>
          <NavBar />
          {/* <ArticleList /> */}
          <Route path="/" exact component={ArticleList} />
          <Route
            path="/articles/:slug"
            exact
            render={({ match }) => {
              const { slug } = match.params;
              return <Article article={test} slug={slug} />;
            }}
          />
          <Route path="/login" component={SignIn} />
          <Route path="/register" component={SignUp} />
          {/* <Route path="/article" component={Article} /> */}
        </Router>
      </div>
    );
  }
  return (
    <div className={styles.main}>
      <NavBar />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: { ...state.reducerGetArticles.articles },
  };
};

export default connect(mapStateToProps)(MainPage);
