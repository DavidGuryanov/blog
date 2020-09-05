import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as styles from "./createArticle.module.scss";

var classNames = require("classnames/bind");
let cx = classNames.bind(styles);

const CreateArticle = ({ createNewArticle, user, ok, loading, isLoggedIn }) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
  });
  const [tagList, setTagList] = useState([]);
  if (!isLoggedIn || ok) {
    return <Redirect to="/" />;
  }
  const onSubmit = (data) => {
    let tagss = { tags: tagList };
    let dataObj = { ...tagss, ...data };
    createNewArticle(dataObj, user.token, user.username);
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
      <div className={styles.create_article__tags_container} key={count}>
        <input
          type="text"
          className={styles.create_article__input_field}
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
          <div className={styles.create_article__tags_container} key={count}>
            <input
              type="text"
              className={styles.create_article__input_field}
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
              onClick={(e) => {
                let arr = [...tagList];
                arr.splice(index, 1);
                setTagList(arr);
              }}
              type="button"
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
          <div className={styles.create_article__tags_container} key={count}>
            <input
              type="text"
              className={styles.create_article__input_field}
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
      className={styles.create_article__container}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h4 className={styles.create_article__header}>Create new article</h4>
      <label className={styles.create_article__label} htmlFor="title">
        Title
      </label>
      <input
        type="text"
        className={cx({
          create_article__input_field: true,
          create_article__input_field_error: errors.title,
        })}
        id="title"
        name="title"
        placeholder="Title"
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
      <label className={styles.create_article__label} htmlFor="description">
        Short description
      </label>
      <input
        type="text"
        className={cx({
          create_article__input_field: true,
          create_article__input_field_error: errors.description,
        })}
        id="description"
        placeholder="Description"
        name="description"
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
      <label className={styles.create_article__label} htmlFor="text">
        Text
      </label>
      <textarea
        className={cx({
          create_article__textarea: true,
          create_article__input_field_error: errors.text,
        })}
        id="text"
        rows="10"
        placeholder="Text"
        name="text"
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
      <label className={styles.create_article__label} htmlFor="tags">
        Tags
      </label>
      {tags}
      <input
        type="submit"
        value="Create"
        className={styles.submit__btn}
        disabled={loading}
      />
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    user: { ...state.reducerGetCurrentuser.currentUser },
    ok: state.reducerSetStatus.ok,
    loading: state.reducerSetStatus.loading,
    isLoggedIn: state.reducerGetCurrentuser.isLoggedIn,
  };
};
const mapDispatchToProps = (dispatch) => {
  const { createNewArticle } = bindActionCreators(actions, dispatch);
  return {
    createNewArticle,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
