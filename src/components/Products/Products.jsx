import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Products.module.css";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Cart_add from "../../assets/cart_add_icon.svg";
import Cart_remove from "../../assets/cart_remove_icon.svg";
import useCartStore from "../../store.js";

const fetchProducts = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data;
};

const categories = {
  0: "All products",
  1: "Men's Clothing",
  2: "Women's Clothing",
  3: "Jewelery",
  4: "Electronics",
};

export default function Products() {
  const {
    isPending,
    isError,
    data: products,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const [category, setCategory] = useState("All products");
  const params = useParams();
  const productId = params.id;
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const isInCart = (id) => cart.some((item) => item.id === id);

  if (isError) return <h1>Error fetching {error.message}</h1>;
  if (productId) return <h1>Product {productId}</h1>;
  return (
    <div className={styles["products-container"]}>
      <Sidebar
        categoriesList={categories}
        currentCategory={category}
        setCategory={setCategory}
      />
      <div className={styles["products-wrapper"]}>
        <h1 className={styles["products-wrapper__header"]}>{category}</h1>
        <ul className={styles["products-list"]}>
          {isSuccess &&
            products.map((product) => {
              if (
                product.category.toLowerCase() === category.toLowerCase() ||
                category === "All products"
              ) {
                return (
                  <li key={product.id} className={styles["product-container"]}>
                    <Product data={product} />
                    {isInCart(product.id) ? (
                      <button
                        className={styles["product-container__button"]}
                        onClick={(e) => {
                          removeFromCart(product);
                          console.log("Clicked to remove");
                        }}
                      >
                        <img
                          src={Cart_remove}
                          alt="Remove from cart"
                          className={styles["button__image"]}
                        />
                      </button>
                    ) : (
                      <button
                        className={styles["product-container__button"]}
                        onClick={(e) => {
                          addToCart(product);
                        }}
                      >
                        <img
                          src={Cart_add}
                          alt="Add to cart"
                          className={styles["button__image"]}
                        />
                      </button>
                    )}
                  </li>
                );
              }
            })}
          {isPending && <ProductsSkeleton />}
        </ul>
      </div>
    </div>
  );
}

function Product({ data }) {
  return (
    <Link
      to={`/products/${data.id}`}
      className={styles["product-container__anchor"]}
    >
      <div className={styles["image-wrapper"]}>
        <img
          src={data.image}
          width={100}
          height={100}
          className={styles["image-wrapper__image"]}
        />
      </div>
      <div className={styles["product-container__price"]}>
        <span>{"$" + data.price}</span>
      </div>
      <div className={styles["product-container__title"]}>
        <h3>{data.title[0].toUpperCase() + data.title.slice(1)}</h3>
      </div>
      <div className={styles["product-container__description"]}>
        <pre>
          {data.description[0].toUpperCase() + data.description.slice(1)}
        </pre>
      </div>
      <div className={styles["product-container__rating"]}>
        <span className={styles["rating__rate"]}>
          <span className={styles["star"]}>★</span>
          {data.rating.rate}
        </span>
        {"/"}
        <span className={styles["rating__count"]}>
          {data.rating.count} reviews
        </span>
      </div>
    </Link>
  );
}
function ProductsSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => {
        return (
          <li
            key={index}
            className={`${styles["product-container"]} ${styles.skeleton}`}
          >
            <div className={`${styles.data} ${styles["product-cover"]}`}></div>
            <div
              className={`${styles.data} ${styles["size_l"]} ${styles["short"]}`}
            ></div>
            <div className={`${styles.data} ${styles["size_l"]}`}></div>
            <div className={`${styles.data} ${styles["size_m"]}`}></div>
          </li>
        );
      })}
    </>
  );
}
