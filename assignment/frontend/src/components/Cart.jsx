/** @format */

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createNotification } from "../redux/actionCreators/notificationsActions";
import { addOrder } from "../redux/actionCreators/ordersActions";
import CartItem from "./CartItem";

/**
 * @component
 * @returns
 */
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cart);
  const role = useSelector((state) => state.auth).role;

  /**
   * Handle order
   * @param {*} e Event
   */
  const orderClick = (e) => {
    e.preventDefault();

    if (!role || role === "guest") {
      dispatch(
        createNotification({
          message: "Authentication required",
          isSuccess: false,
        })
      );
      navigate("/login");
    } else {
      dispatch(addOrder(cartState));
    }
  };

  if (!cartState || cartState.length === 0) {
    return (
      <div data-testid="cart-component">
        <div data-testid="empty-cart">empty</div>
      </div>
    );
  }

  const cartItems = cartState.map((val) => CartItem({ item: val }));

  return (
    <div data-testid="cart-component">
      <div data-testid="cart-item-container">{cartItems}</div>
      <button data-testid="order-button" onClick={orderClick}></button>
    </div>
  );
};

export default Cart;
