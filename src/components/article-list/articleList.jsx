import React from "react";
import { connect } from "react-redux";
import Article from "../article/article";
import ArticleHeader from "../article-header/articleHeader";
import { Pagination } from "antd";
import "antd/dist/antd.css";
import "./articleList_antd.css";
import * as styles from "./articleList.module.scss";

const ArticleList = (props) => {
  const { articles } = props;
  const articlesToShow = Object.values(articles);
  let count = 0;
  const show = articlesToShow.map((value) => {
    count += 1;
    return <ArticleHeader article={value} key={count} short={true} />;
  });
  return (
    <div className={styles.article__container}>
      {show}
      <Pagination defaultCurrent={1} total={50} />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    articles: { ...state.reducerGetArticles.articles },
  };
};
export default connect(mapStateToProps)(ArticleList);
