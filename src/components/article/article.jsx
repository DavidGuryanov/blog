import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { Statistic, Tag, Avatar } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import "antd/dist/antd.css";
import "./article_antd.css";

import * as styles from "./article.module.scss";

function formatDate(date) {
  return format(new Date(date), "MMMM dd, yyyy");
}
function getTags(tags) {
  if (tags.length > 0) {
    return tags.map((el) => {
      return (
        <Tag className="tag" key={el}>
          {el}
        </Tag>
      );
    });
  } else {
    return <Tag className="tag">No tags available</Tag>;
  }
}

const ArticleHeader = (props) => {
  const { article } = props;
  const {
    author: { bio, following, image, username },
    body,
    createdAt,
    description,
    favorited,
    favoritesCount,
    slug,
    tagList,
    title,
    updatedAt,
  } = article;

  return (
    <div className={styles.article__header}>
      <div className={styles.header__likes}>
        <div className={styles.article__likes}>
          <h2 className={styles.article__title}>{title}</h2>
          <Statistic value={favoritesCount} prefix={<HeartOutlined />} />
        </div>
        {getTags(tagList)}
        <div className={styles.article__annotation}>{description}</div>
      </div>

      <div className={styles.article__author}>
        <div>
          <p className={styles.article__author_name}>{username}</p>
          <p className={styles.article__author_date}>{formatDate(createdAt)}</p>
        </div>
        <Avatar size={46} src={image} />
      </div>
    </div>
  );
};

const Article = ({ slug, result, fetchSingleArticle, getSingleArticle }) => {
  const {
    article: { article: currentArticle },
    loading,
  } = result;

  useEffect(() => {
    fetchSingleArticle(slug);
    return function cleanup() {
      getSingleArticle("remove");
    };
  }, []);

  if (currentArticle) {
    const {
      author: { bio, following, image, username },
      body,
      createdAt,
      description,
      favorited,
      favoritesCount,

      tagList,
      title,
      updatedAt,
    } = currentArticle;
    return (
      <div className={styles.article__container}>
        <ArticleHeader article={currentArticle}></ArticleHeader>
        <div className={styles.article__text}>{body}</div>
      </div>
    );
  }

  return <div className={styles.article__container}>Loading</div>;
};

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    result: { ...state.reducerGetSingleArticle },
  };
};
const mapDispatchToProps = (dispatch) => {
  // console.log(dispatch);
  const { fetchSingleArticle, getSingleArticle } = bindActionCreators(
    actions,
    dispatch
  );
  return {
    fetchSingleArticle,
    getSingleArticle,
    // sortFast,
    // transferAll,
    // transferNone,
    // transferOne,
    // transferTwo,
    // transferThree,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
