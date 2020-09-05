import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import * as styles from "./editArticle.module.scss";

var classNames = require("classnames/bind");
let cx = classNames.bind(styles);

const EditArticle = ({
  user,
  ok,
  isLoggedIn,
  slug,
  ownArticles,
  updateArticle,
}) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
  });

  const [currentArticle, setCurrentArticle] = useState(
    ownArticles.find((e, i) => {
      if (e.slug === slug && isLoggedIn) {
        return true;
      }
      return false;
    })
  );
  const [tagList, setTagList] = useState(["initial"]);
  if (
    currentArticle === undefined ||
    !isLoggedIn ||
    ok ||
    user.username !== currentArticle.author.username
  ) {
    return <Redirect to="/" />;
  } else if (tagList[0] === "initial") {
    setTagList([...currentArticle.tagList]);
  }

  const onSubmit = (data) => {
    let tagss = { tags: tagList };
    let dataObj = { ...tagss, ...data };
    updateArticle(dataObj, user.token, user.username, slug);
  };
  const add = (tag) => {
    let arr = [...tagList];
    if (!tag && !arr[arr.length - 1]) {
      return null;
    }
    arr.push(tag);
    setTagList(arr);
  };
  let count = 0;
  let tags = null;
  let currentVal = "";
  if (tagList.length === 0) {
    tags = (
      <div className={styles.edit_article__tags_container} key={count}>
        <input
          type="text"
          className={styles.edit_article__input_field}
          id="tags"
          placeholder="Tag"
          onChange={(e) => (currentVal = e.target.value)}
        ></input>
        <button
          className={styles.add__btn}
          value="Add tag"
          onClick={() => add(currentVal)}
          type="button"
        >
          Add tag
        </button>
      </div>
    );
  } else {
    tags = tagList.map((val, index) => {
      count += 1;
      if (index === tagList.length - 1) {
        return (
          <div className={styles.edit_article__tags_container} key={count}>
            <input
              type="text"
              className={styles.edit_article__input_field}
              id="tags"
              placeholder="Tag"
              value={val}
              onChange={(e) => {
                let arr = [...tagList];
                arr[index] = e.target.value;
                setTagList(arr);
              }}
            ></input>
            <button
              className={styles.del__btn}
              type="button"
              onClick={(e) => {
                let arr = [...tagList];
                arr.splice(index, 1);
                setTagList(arr);
              }}
            >
              Delete
            </button>
            <button
              className={styles.add__btn}
              onClick={() => add("")}
              type="button"
            >
              Add Tag
            </button>
          </div>
        );
      } else
        return (
          <div className={styles.edit_article__tags_container} key={count}>
            <input
              type="text"
              className={styles.edit_article__input_field}
              id="tags"
              placeholder="Tag"
              value={val}
              onChange={(e) => {
                let arr = [...tagList];
                arr[index] = e.target.value;
                setTagList(arr);
              }}
            ></input>
            <button
              type="button"
              className={styles.del__btn}
              onClick={(e) => {
                let arr = [...tagList];
                arr.splice(index, 1);
                setTagList(arr);
              }}
            >
              Delete
            </button>
          </div>
        );
    });
  }

  return (
    <form
      className={styles.edit_article__container}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h4 className={styles.edit_article__header}>Edit article</h4>
      <label className={styles.edit_article__label} htmlFor="title">
        Title
      </label>
      <input
        type="text"
        className={cx({
          edit_article__input_field: true,
          edit_article__input_field_error: errors.title,
        })}
        id="title"
        name="title"
        placeholder="Title"
        value={currentArticle.title}
        onChange={(e) => {
          setCurrentArticle({ ...currentArticle, title: e.target.value });
        }}
        ref={register({ required: true })}
      ></input>
      {errors.title && errors.title.type === "required" && (
        <p
          className={cx({
            input__error_message: true,
          })}
        >
          This field is required
        </p>
      )}
      <label className={styles.edit_article__label} htmlFor="description">
        Short description
      </label>
      <input
        type="text"
        className={cx({
          edit_article__input_field: true,
          edit_article__input_field_error: errors.description,
        })}
        id="description"
        placeholder="Description"
        name="description"
        value={currentArticle.description}
        onChange={(e) => {
          setCurrentArticle({
            ...currentArticle,
            description: e.target.value,
          });
        }}
        ref={register({ required: true })}
      ></input>
      {errors.description && errors.description.type === "required" && (
        <p
          className={cx({
            input__error_message: true,
          })}
        >
          This field is required
        </p>
      )}
      <label className={styles.edit_article__label} htmlFor="text">
        Text
      </label>
      <textarea
        className={cx({
          edit_article__textarea: true,
          edit_article__input_field_error: errors.text,
        })}
        id="text"
        rows="10"
        placeholder="Text"
        name="text"
        value={currentArticle.body}
        onChange={(e) => {
          setCurrentArticle({ ...currentArticle, body: e.target.value });
        }}
        ref={register({ required: true })}
      ></textarea>
      {errors.text && errors.text.type === "required" && (
        <p
          className={cx({
            input__error_message: true,
          })}
        >
          This field is required
        </p>
      )}
      <label className={styles.edit_article__label} htmlFor="tags">
        Tags
      </label>
      {tags}
      <input
        type="submit"
        value="Save changes"
        className={styles.submit__btn}
      />
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    ownArticles: [...state.reducerGetArticles.articlesByAuthor],
    user: { ...state.reducerGetCurrentuser.currentUser },
    ok: state.reducerSetStatus.ok,
    isLoggedIn: state.reducerGetCurrentuser.isLoggedIn,
  };
};
const mapDispatchToProps = (dispatch) => {
  const { fetchArticles, updateArticle } = bindActionCreators(
    actions,
    dispatch
  );
  return {
    fetchArticles,
    updateArticle,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
