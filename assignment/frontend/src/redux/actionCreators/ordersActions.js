/** @format */

// ORDER ACTION CREATORS

import { GET_ORDERS, ADD_ORDER, GET_ORDER } from "../constants";
import { emptyCart } from "./cartActions";
import { createNotification } from "./notificationsActions";

const orderMsg = {
  newOrder: "New order made.",
};
/**
 * @description Action creator for getting a single order. Dispatches action with type GET_ORDER and payload of the fetched order if succesfull.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 * @param {String} orderId -  The id of the order to get
 * @return {Function} - Thunk -> action
 */
export const getOrder = (orderId) => {
  return async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}`);
    const data = await response.json();

    if (!response.ok) {
      return dispatch(
        createNotification({
          isSuccess: false,
          message: data.error,
        })
      );
    }

    dispatch({
      type: GET_ORDER,
      payload: data,
    });
  };
};

/**
 * @description Action creator for getting all orders. Dispatches action with type GET_ORDERS and payload of the fetched orders if succesfull.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 * @return {Function} - Thunk -> action
 */
export const getOrders = () => {
  return async (dispatch) => {
    const response = await fetch("/api/orders");
    const data = await response.json();

    if (!response.ok) {
      return dispatch(
        createNotification({
          isSuccess: false,
          message: data.error,
        })
      );
    }

    dispatch({
      type: GET_ORDERS,
      payload: data,
    });
  };
};

/**
 * @description Action creator for adding a new order. Dispatches actions:
 * - ADD_ORDER-type with payload that has the new order
 * - EMPTY_CART-type with no payload
 * - NEW_NOTIFICATION with orderMsg.newOrder in the payload
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 *
 * @param {Object} newOrder -  The new order to post
 * @return {Function} - Thunk -> action
 */
export const addOrder = (newOrder) => {
  return async (dispatch) => {
    const response = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify(newOrder),
    });
    const data = await response.json();

    if (!response.ok) {
      return dispatch(
        createNotification({
          isSuccess: false,
          message: data.error,
        })
      );
    }

    dispatch(emptyCart());
    dispatch({
      type: ADD_ORDER,
      payload: data,
    });
    dispatch(
      createNotification({
        isSuccess: true,
        message: orderMsg.newOrder,
      })
    );
  };
};
