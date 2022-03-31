// CART ACTION CREATORS
import {
  ADD_CART_ITEM,
  EMPTY_CART,
  INIT_CART,
  REMOVE_CART_ITEM,
  UPDATE_CART_ITEM_AMOUNT,
} from "../constants";
import { createNotification } from "./notificationsActions";

const cartMsg = {
  add: "New cart item added.",
  update: "Cart item amount updated.",
};
/**
 * @description Action creator that initiates the cart after page is refreshed.
 * Dispatches an INIT_CART-type action along with pre-existing cart-items stored locally as payload to the frontends redux-stores product-state.
 * @description Action creator that initiates the cart after page is refreshed.  Sends an INIT_CART-type action along with pre-existing cart-items stored locally as payload to the frontends redux-stores product-state.
 * @returns {object} action
 */
export const initCart = () => {
  const cartLocal = localStorage.getItem("cart");

  if (cartLocal) {
    return {
      type: INIT_CART,
      payload: JSON.parse(cartLocal),
    };
  }

  return { type: INIT_CART };
};

/**
 * @description Action creator that adds a new cart item to local storage.
 * Dispatches an ADD_CART_ITEM-type action along with product as payload to the frontends redux-stores product-state,
 * as well as a NEW_NOTIFICATION action to the frontends notification-state with a succesful message using cartMsg.add
 * @param {string} product - The product item to add
 * @returns {Function} thunk
 */
export const addCartItem = (product) => {
  return (dispatch) => {
    const cartLocal = localStorage.getItem("cart");

    if (!cartLocal) {
      localStorage.setItem("cart", JSON.stringify([product]));
    } else {
      const cart = JSON.parse(cartLocal);
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    dispatch({
      type: ADD_CART_ITEM,
      payload: product,
    });
    dispatch(
      createNotification({
        isSuccess: true,
        message: cartMsg.add,
      })
    );
  };
};

/**
 * @description Action creator that removes a cart item from local storage.  Sends a REMOVE_CART_ITEM-type action along with product as payload to the frontends redux-stores product-state.
 * @param {string} product - The product item to remove from cart
 * @returns {object} Action
 */
export const removeCartItem = (product) => {
  const cartLocal = localStorage.getItem("cart");

  if (cartLocal) {
    const cart = JSON.parse(cartLocal);
    const newCart = cart.filter((item) => item.product.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  return {
    type: REMOVE_CART_ITEM,
    payload: product,
  };
};

/**
 * @description Thunk action creator that increments a cart items quantity in local store.
 * Dispatches a UPDATE_CART_ITEM_AMOUNT-type action along with the update details { productId, amount: 1 } as payload to the frontends redux-stores product-state.
 * Also sends NEW_NOTIFICATION-type action with payload of a message informing the items amount is updated (use cartMsg.update).
 * @param {string} productId - The cart item id to increment
 * @returns {Function} thunk
 */
export const incrementCartItem = (productId) => {
  return (dispatch) => {
    const cartLocal = localStorage.getItem("cart");

    if (cartLocal) {
      const cart = JSON.parse(cartLocal);
      const newCart = cart.map((item) => {
        if (item.product.id === productId) {
          item.amount += 1;
        }

        return item;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
    }

    dispatch({
      type: UPDATE_CART_ITEM_AMOUNT,
      payload: { productId, amount: 1 },
    });
    dispatch(
      createNotification({
        isSuccess: true,
        message: cartMsg.update,
      })
    );
  };
};

/**
 * @description Thunk action creator that decrements (reduces) a cart items quantity in local store.
 * Dispatches a UPDATE_CART_ITEM_AMOUNT-type action along with the update details  { productId, amount: -1 } as payload to the frontends redux-stores product-state.
 * Also sends NEW_NOTIFICATION-type action with payload of a message informing the items amount is updated (use cartMsg.update)
 * @param {string} productId - The cart item id to decrement
 * @returns {Function} thunk
 */
export const decrementCartItem = (productId) => {
  return (dispatch) => {
    const cartLocal = localStorage.getItem("cart");

    if (cartLocal) {
      const cart = JSON.parse(cartLocal);
      const newCart = cart.map((item) => {
        if (item.product.id === productId) {
          item.amount -= 1;
        }

        return item;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
    }

    dispatch({
      type: UPDATE_CART_ITEM_AMOUNT,
      payload: { productId, amount: -1 },
    });
    dispatch(
      createNotification({
        isSuccess: true,
        message: cartMsg.update,
      })
    );
  };
};

/**
 * @description An action creator which removes the entire cart-item from local store. Returns an action with EMPTY_CART-type to remove cart all items.
 * @returns {object} the action
 */
export const emptyCart = () => {
  localStorage.removeItem("cart");
  return { type: EMPTY_CART };
};
