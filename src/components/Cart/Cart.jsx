import { useCart } from "../../contexts/CartContext";
import CartItem from "../CartItem/CartItem";
import EmptyCart from "../EmptyCart/EmptyCart";
import NonEmptyCart from "../NonEmptyCart/NonEmptyCart";
import styles from "./Cart.module.css";

function Cart() {
  const { cart } = useCart();
  const total = cart.reduce((acc, curr) => acc + curr.price * curr.count, 0);

  return (
    <section className={styles.cart__section}>
      <h2 className={`${styles.cart__heading} heading-2`}>
        Your Cart ({cart.length})
      </h2>
      {cart.length > 0 ? <NonEmptyCart /> : <EmptyCart />}
    </section>
  );
}

export default Cart;
