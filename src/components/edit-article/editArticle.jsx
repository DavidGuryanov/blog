import React from "react";
import * as styles from "./editArticle.module.scss";

const EditArticle = () => {
  return (
    <div className={styles.edit_article__container}>
      <h4 className={styles.edit_article__header}>Edit article</h4>
      <label className={styles.edit_article__label} for="title">
        Title
      </label>
      <input
        type="text"
        className={styles.edit_article__input_field}
        id="title"
        placeholder="Title"
      ></input>
      <label className={styles.edit_article__label} for="description">
        Short description
      </label>
      <input
        type="text"
        className={styles.edit_article__input_field}
        id="description"
        placeholder="Description"
      ></input>
      <label className={styles.edit_article__label} for="text">
        Text
      </label>
      <textarea
        className={styles.edit_article__textarea}
        id="text"
        rows="10"
        placeholder="Text"
      ></textarea>
      <label className={styles.edit_article__label} for="tags">
        Tags
      </label>

      <div className={styles.edit_article__tags_container}>
        <input
          type="text"
          className={styles.edit_article__input_field}
          id="tags"
          placeholder="Tag"
        ></input>

        <button className={styles.del__btn}>Delete</button>
      </div>
      <div className={styles.edit_article__tags_container}>
        <input
          type="text"
          className={styles.edit_article__input_field}
          id="tags"
          placeholder="Tag"
        ></input>
        <button className={styles.del__btn}>Delete</button>
        <button className={styles.add__btn}>Add Tag</button>
      </div>

      <button className={styles.submit__btn}>edit</button>
    </div>
  );
};

export default EditArticle;
