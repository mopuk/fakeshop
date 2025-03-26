import React from "react";
import styles from "./Sidebar.module.css";

export default function Sidebar({
  categoriesList,
  currentCategory,
  setCategory,
}) {
  return (
    <div className={styles["sidebar-container"]}>
      <div className={styles["categories-wrapper"]}>
        <h2 className={styles["categories__header"]}>Categories</h2>
        <ul className={styles["categories-list"]}>
          {Object.entries(categoriesList).map(([ind, category]) => (
            <li
              className={`${styles["category"]} ${
                currentCategory === category ? styles["chosen"] : ""
              }`}
              key={category}
              onClick={(e) => setCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
