/** @format */

import React from "react";
import { useDispatch } from "react-redux";
import {
  decrementCartItem,
  incrementCartItem,
  removeCartItem,
} from "../redux/actionCreators/cartActions";

/**
 * Render cart item
 * @component
 */
const CartItem = ({ product, quantity }) => {
  const dispatch = useDispatch();

  /**
   * Decrement or remove item from cart
   * @param {*} e Click event
   */
  const decrementQuantity = (e) => {
    e.preventDefault();

    if (quantity > 1) {
      dispatch(decrementCartItem(product.id));
    } else {
      dispatch(removeCartItem(product));
    }
  };

  /**
   * Increment item amount in cart
   * @param {*} e Event
   */
  const incrementQuantity = (e) => {
    e.preventDefault();
    dispatch(incrementCartItem(product.id));
  };

  return (
    <div data-testid="cart-item-component" key={`cart-item-${product.id}`}>
      <p data-testid="item-name">{product.name}</p>
      <p data-testid="item-price">{product.price}</p>
      <p data-testid="item-amount">{quantity}</p>
      <button
        data-testid={`plus-btn-${product.id}`}
        onClick={incrementQuantity}
      >
        (+)
      </button>
      <button
        data-testid={`minus-btn-${product.id}`}
        onClick={decrementQuantity}
      >
        (-)
      </button>
    </div>
  );
};

export default CartItem;
