import styles from "./ProductCard.module.scss";
import Button from "@/components/Button";

function ProductCard({ product = {} }) {
  const { title, thumbnail, price, discountPercentage, brand, category } =
    product;

  const discount =
    discountPercentage > 0 ? (price * (100 - discountPercentage)) / 100 : price;

  return (
    <article className={styles.wrapper}>
      <div className={styles["img-container"]}>
        <img
          className={styles.img}
          src={thumbnail}
          alt={title}
        />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}> {title} </h2>
        <p className={styles.description}>
          <span className={styles.brand}>{brand}</span>
          <span className={styles.category}>{category}</span>
        </p>

        <div className={styles.prices}>
          <span className={styles.discount}>${discount.toFixed(2)}</span>
          {discountPercentage > 0 && (
            <span className={styles.price}>${price.toFixed(2)}</span>
          )}
        </div>
        <div className={styles["btn-control"]}>
          <Button
            children={<span>View detail</span>}
            rounded
            sm
          />
          <Button
            children={<span>Add to cart</span>}
            rounded
            sm
            primary
          />
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
