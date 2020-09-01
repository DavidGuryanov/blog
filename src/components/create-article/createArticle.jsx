import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as styles from "./createArticle.module.scss";

var classNames = require("classnames/bind");
let cx = classNames.bind(styles);

//setTagList(["firstTag", "secondTag"]);

const CreateArticle = () => {
  const { register, handleSubmit, watch, errors, setError, trigger } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => console.log(data);
  const [tagList, setTagList] = useState([1, 2, 3]);

  const add = (tag) => {
    let arr = [...tagList];
    console.log(arr);
    arr.push(tag);
    console.log(arr);
    setTagList(arr);
    console.log(tagList);
  };
  let count = 0;
  let test = null;
  let currentVal = "";
  if (tagList.length === 0) {
    test = (
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
        >
          Add tag
        </button>
      </div>
    );
  } else {
    test = tagList.map((val, index) => {
      count += 1;
      //return console.log(value);
      if (index == tagList.length - 1) {
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
                console.log(arr);
                setTagList(arr);
              }}
            ></input>
            <button
              className={styles.del__btn}
              onClick={(e) => {
                let arr = [...tagList];
                arr.splice(index, 1);
                console.log(arr);
                setTagList(arr);
              }}
            >
              Delete
            </button>
            <button className={styles.add__btn} onClick={() => add("")}>
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
                console.log(arr);
                setTagList(arr);
              }}
            ></input>
            <button
              className={styles.del__btn}
              onClick={(e) => {
                let arr = [...tagList];
                arr.splice(index, 1);
                console.log(arr);
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
      <button onClick={() => console.log(tagList)}>Test</button>
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

      {/* <div className={styles.create_article__tags_container}>
        <input
          type="text"
          className={styles.create_article__input_field}
          id="tags"
          placeholder="Tag"
        ></input>
        
        <button className={styles.del__btn}>Delete</button>
      </div> */}

      {test}

      <input type="submit" value="Create" className={styles.submit__btn} />
    </form>
  );
};

export default CreateArticle;
