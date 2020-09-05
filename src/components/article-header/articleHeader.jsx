import React from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Statistic, Tag, Avatar } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { format } from "date-fns";
import * as actions from "../../actions/actions";
import "antd/dist/antd.css";
import "./articleHeader_antd.css";

import * as styles from "./articleHeader.module.scss";

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

const ArticleHeader = ({
  article,
  history,
  favoriteArticle,
  user,
  isLoggedIn,
}) => {
  const {
    author: { image, username },
    createdAt,
    description,
    favorited,
    favoritesCount,
    slug,
    tagList,
    title,
  } = article;

  return (
    <div className={styles.article__header}>
      <div className={styles.header__likes}>
        <div className={styles.article__likes}>
          <h2
            className={styles.article__title}
            onClick={() => history.push(`/articles/${slug}`)}
          >
            {title}
          </h2>

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
        <div className={styles.tags}>{getTags(tagList)}</div>

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

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.reducerGetCurrentuser.isLoggedIn,
    user: { ...state.reducerGetCurrentuser.currentUser },
  };
};
const mapDispatchToProps = (dispatch) => {
  const { favoriteArticle } = bindActionCreators(actions, dispatch);
  return {
    favoriteArticle,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ArticleHeader));
