/** @format */

// PRODUCT ACTION CREATORS

import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../constants";
import { createNotification } from "./notificationsActions";

export const productMsg = {
  added: "Product added.",
  updated: "Product updated.",
  deleted: (product) => {
    return `${product.name} deleted successfully`;
  },
};

/**
 * @description Asynchronous Action creator for getting a single product. Dispatches an action with type GET_PRODUCT through thunk if succesful or NEW_NOTIFICATION-type and error message from db in the payload
 * @param {String} productId - The id of the product to get
 * @return {Function} - Thunk -> action
 */
export const getProduct = (productId) => {
  return async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
      headers: {
        Accept: "application/json",
      },
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

    dispatch({
      type: GET_PRODUCT,
      payload: data,
    });
  };
};

/**
 * @description Asynchronous Action creator that dispatches all the products it receives from DB to the frontends redux-stores product-state. Dispatches GET_PRODUCTS with products as payload if succesfull, or NEW_NOTIFICATION-type and error message from db in the payload
 * @return {Function} - Thunk -> action
 */
export const getProducts = () => {
  return async (dispatch) => {
    const response = await fetch("/api/products", {
      headers: {
        Accept: "application/json",
      },
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

    dispatch({
      type: GET_PRODUCTS,
      payload: data,
    });
  };
};

/**
 * @description Asynchronous Action creator that adds a new product to the DB, then dispatches an ADD_PRODUCT-type action with product as payload to the frontends redux-stores product-state, as well as a NEW_NOTIFICATION-type action to the frontends notification-state with the productMsg.added as a successful message.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message. If the error itself is an object, then it should pass whatever is inside the object.
 * @param {Object} productToAdd - The product to add
 * @return {Function} - Thunk -> action
 */
export const addProduct = (productToAdd) => {
  return async (dispatch) => {
    const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(productToAdd),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      if (typeof data.error === "object") {
        return dispatch(
          createNotification({
            isSuccess: false,
            message: Object.values(data.error)[0],
          })
        );
      }

      return dispatch(
        createNotification({
          isSuccess: false,
          message: data.error,
        })
      );
    }

    dispatch({
      type: ADD_PRODUCT,
      payload: data,
    });
    dispatch(
      createNotification({
        isSuccess: true,
        message: productMsg.added,
      })
    );
  };
};

/**
 * @description Asynchronous Action creator that updates an existing product in the DB, then dispatches an UPDATE_PRODUCT-type action to the frontends redux-stores product-state, as well as a NEW_NOTIFICATION-type action to the frontends notification-state with the productMsg.updated as a successful message.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 * @param {Object} productToUpdate - The product with updated values
 * @return {Function} - Thunk -> action
 */
export const updateProduct = (productToUpdate) => {
  return async (dispatch) => {
    const response = await fetch(`/api/products/${productToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify(productToUpdate),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
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

    dispatch({
      type: UPDATE_PRODUCT,
      payload: data,
    });
    dispatch(
      createNotification({
        isSuccess: true,
        message: productMsg.updated,
      })
    );
  };
};

/**
 * @description Asynchronous Action creator that deletes existing product in the DB, then dispatches a DELETE_PRODUCT-type action along with product as payload to the frontends redux-stores product-state, as well as a NEW_NOTIFICATION-type action to the frontends notification-state with the productMsg.deleted(product) as a successful message.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 * @param {String} productId - The id of the product to delete
 * @return {Function} redux thunk -> action
 */
export const deleteProduct = (productId) => {
  return async (dispatch) => {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
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

    dispatch({
      type: DELETE_PRODUCT,
      payload: data,
    });
    dispatch(
      createNotification({
        isSuccess: true,
        message: productMsg.deleted(data),
      })
    );
  };
};
