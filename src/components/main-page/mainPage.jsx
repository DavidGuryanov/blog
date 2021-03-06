import React from "react";
import { fetchArticles } from "../../actions/actions";
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
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

const MainPage = ({ articles, fetchArticles }) => {
  if (articles) {
    return (
      <div className={styles.main}>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact component={ArticleList} />
            <Route path="/articles/" exact component={ArticleList} />
            <Route
              path="/articles/:slug"
              exact
              render={({ match }) => {
                const { slug } = match.params;
                return <Article slug={slug} />;
              }}
            />
            <Route
              path="/articles/:slug/edit"
              exact
              render={({ match }) => {
                const { slug } = match.params;
                return <EditArticle slug={slug} />;
              }}
            />
            <Route path="/sign-in/" exact component={SignIn} />
            <Route path="/sign-up/" exact component={SignUp} />
            <Route path="/profile/" exact component={EditAccount} />
            <Route path="/new-article/" exact component={CreateArticle} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
  return (
    <div className={styles.main}>
      <NavBar />
      <h3>Error</h3>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: { ...state.reducerGetArticles.articles },
  };
};

export default connect(mapStateToProps, { fetchArticles })(MainPage);
