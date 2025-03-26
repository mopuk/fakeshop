import useCartStore from "../../store";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);

  return (
    <div className={styles["cart-container"]}>
      <h1 className={styles["cart__title"]}>Your Cart</h1>
      <ul className={styles["cart-list"]}>
        {cart.map((item) => {
          console.log(item);
          return (
            <li key={item.id} className={styles["product-container"]}>
              <Link
                to={`/products/${item.id}`}
                className={styles["product__anchor"]}
              >
                <div className={styles["image-wrapper"]}>
                  <img
                    src={item.image}
                    width={100}
                    height={100}
                    className={styles["image-wrapper__image"]}
                  />
                </div>
                <div className={styles["product__content"]}>
                  <div className={styles["product__price"]}>
                    <span>{"$" + item.price}</span>
                  </div>
                  <div className={styles["product__title"]}>
                    <h3>{item.title[0].toUpperCase() + item.title.slice(1)}</h3>
                  </div>
                  <div className={styles["product__description"]}>
                    <pre>
                      {item.description[0].toUpperCase() +
                        item.description.slice(1)}
                    </pre>
                  </div>
                  <div className={styles["product__rating"]}>
                    <span className={styles["rating__rate"]}>
                      <span className={styles["star"]}>★</span>
                      {item.rating.rate}
                    </span>
                    {"/"}
                    <span className={styles["rating__count"]}>
                      {item.rating.count} reviews
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
