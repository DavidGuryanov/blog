import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { Redirect, withRouter } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import Loading from "../status/loading";
import * as actions from "../../actions/actions";
import { Statistic, Tag, Avatar, Modal } from "antd";
import {
  HeartOutlined,
  ExclamationCircleOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { format } from "date-fns";
import "antd/dist/antd.css";
import "./article_antd.css";
import * as styles from "./article.module.scss";
const { confirm } = Modal;
var classNames = require("classnames");
const editArticleBtn = classNames(styles.btn, styles.editArticleBtn);
const deleteArticleBtn = classNames(styles.btn, styles.deleteArticleBtn);

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
function showConfirm(slug, username, token, func) {
  confirm({
    title: "Are you sure you want to delete this article?",
    icon: <ExclamationCircleOutlined />,
    content: "This can't be undone",
    onOk() {
      func(slug, username, token);
    },
    onCancel() {},
  });
}

const Article = ({
  slug,
  result,
  fetchSingleArticle,
  deleteArticle,
  ownArticles,
  isLoggedIn,
  user,
  ok,
  loadingStatus,
  errors,
  history,
  favoriteArticle,
}) => {
  useEffect(() => {
    if (user) {
      fetchSingleArticle(slug, user.token);
    } else {
      fetchSingleArticle(slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (ok || errors.status) {
    return <Redirect to="/" />;
  }
  const checkIfOwn = ownArticles.find((e, i) => {
    if (e.slug === slug && isLoggedIn) {
      return true;
    }
    return false;
  });
  if (result.article.title) {
    const { article } = result;
    const {
      author,
      body,
      createdAt,
      description,
      favorited,
      favoritesCount,
      tagList,
      title,
    } = article;
    const { image, username } = author;
    return (
      <div className={styles.article__container}>
        <div className={styles.article__header}>
          <div className={styles.header__likes}>
            <div className={styles.article__likes}>
              <h2 className={styles.article__title}>{title}</h2>
              <Statistic
                value={favoritesCount}
                prefix={
                  favorited ? (
                    <HeartFilled
                      style={{ color: "#FF0707" }}
                      onClick={() => {
                        if (isLoggedIn) {
                          favoriteArticle(user.token, slug, "DELETE");
                        }
                      }}
                    />
                  ) : (
                    <HeartOutlined
                      onClick={() => {
                        if (isLoggedIn) {
                          favoriteArticle(user.token, slug, "POST");
                        }
                      }}
                    />
                  )
                }
              />
            </div>
            <div>{getTags(tagList)}</div>

            <div className={styles.article__annotation}>{description}</div>
          </div>
          <div className={styles.template__container}>
            <div className={styles.article__author}>
              <div>
                <p className={styles.article__author_name}>{username}</p>
                <p className={styles.article__author_date}>
                  {formatDate(createdAt)}
                </p>
              </div>
              <Avatar size={46} src={image} />
            </div>
            {checkIfOwn ? (
              <div className={styles.template__container2}>
                <button
                  className={deleteArticleBtn}
                  onClick={() =>
                    showConfirm(slug, user.username, user.token, deleteArticle)
                  }
                  disabled={loadingStatus}
                >
                  Delete
                </button>
                <button
                  className={editArticleBtn}
                  onClick={() => history.push(`/articles/${slug}/edit`)}
                  disabled={loadingStatus}
                >
                  Edit
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <ReactMarkdown source={body} className={styles.article__text} />
      </div>
    );
  }
  return <Loading />;
};

const mapStateToProps = (state) => {
  return {
    result: { ...state.reducerGetArticles },
    ownArticles: [...state.reducerGetArticles.articlesByAuthor],
    isLoggedIn: state.reducerGetCurrentuser.isLoggedIn,
    user: { ...state.reducerGetCurrentuser.currentUser },
    ok: state.reducerSetStatus.ok,
    loadingStatus: state.reducerSetStatus.loading,
    errors: state.reducerSetStatus.errors,
  };
};
const mapDispatchToProps = (dispatch) => {
  const {
    fetchSingleArticle,
    deleteArticle,
    favoriteArticle,
  } = bindActionCreators(actions, dispatch);
  return {
    fetchSingleArticle,
    deleteArticle,
    favoriteArticle,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Article));
