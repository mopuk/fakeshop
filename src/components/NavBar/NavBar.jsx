import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import Cart from "../../assets/cart_icon.svg";


export default function NavBar() {
  return (
    <nav className={styles["nav-container"]}>
      <ul className={styles["nav-list"]}>
        <li className={styles["nav__link-container"]}>
          <Link to="/about" className={styles["nav__link"]}>
            ABOUT
          </Link>
        </li>
        <li className={styles["nav__link-container"]}>
          <Link to="/" className={styles["nav__link"]}>
            HOME
          </Link>
        </li>
        <li className={styles["nav__link-container"]}>
          <Link to="/products" className={styles["nav__link"]}>
            PRODUCTS
          </Link>
        </li>
        <li
          className={`${styles["nav__link-container"]} ${styles["link_flex-end"]}`}
        >
          <Link to="/cart" className={styles["nav__link"]}>
            <img
              className={styles["link__icon"]}
              src={Cart}
              alt="Go to your cart"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
