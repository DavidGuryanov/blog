import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { bindActionCreators } from "redux";
import Article from "../article/article";
import ArticleHeader from "../article-header/articleHeader";
import Loading from "../status/loading";
import { Pagination } from "antd";
import "antd/dist/antd.css";
import "./articleList_antd.css";
import * as styles from "./articleList.module.scss";

const ArticleList = ({ articles, fetchArticles }) => {
  useEffect(() => {
    fetchArticles();
  }, []);
  const articlesToShow = Object.values(articles);
  let count = 0;
  const show = articlesToShow.map((value) => {
    count += 1;
    return <ArticleHeader article={value} key={count} short={true} />;
  });
  if (show.length > 0) {
    return (
      <div className={styles.article__container}>
        {show}
        <Pagination
          defaultCurrent={1}
          total={500}
          showSizeChanger={false}
          onChange={(page) => {
            fetchArticles(page * 10 - 10);
          }}
        />
      </div>
    );
  }
  return <Loading />;
};
const mapStateToProps = (state) => {
  return {
    articles: { ...state.reducerGetArticles.articles },
  };
};
const mapDispatchToProps = (dispatch) => {
  // console.log(dispatch);
  const { fetchArticles } = bindActionCreators(actions, dispatch);
  return {
    fetchArticles,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
