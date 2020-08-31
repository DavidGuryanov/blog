import React from "react";
import { useForm } from "react-hook-form";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as styles from "./createArticle.module.scss";

var classNames = require("classnames/bind");
let cx = classNames.bind(styles);

const CreateArticle = () => {
  const { register, handleSubmit, watch, errors, setError, trigger } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => console.log(data);

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
        className={styles.create_article__input_field}
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
        className={styles.create_article__input_field}
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
        className={styles.create_article__textarea}
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

      <div className={styles.create_article__tags_container}>
        <input
          type="text"
          className={styles.create_article__input_field}
          id="tags"
          placeholder="Tag"
        ></input>

        <button className={styles.del__btn}>Delete</button>
      </div>
      <div className={styles.create_article__tags_container}>
        <input
          type="text"
          className={styles.create_article__input_field}
          id="tags"
          placeholder="Tag"
        ></input>
        <button className={styles.del__btn}>Delete</button>
        <button className={styles.add__btn}>Add Tag</button>
      </div>

      <input type="submit" value="Create" className={styles.submit__btn} />
    </form>
  );
};

export default CreateArticle;
