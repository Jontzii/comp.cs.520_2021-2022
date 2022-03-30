/** @format */

// NOTIFICATION ACTION CREATORS

import { NEW_NOTIFICATION, REMOVE_NOTIFICATION } from "../constants";

/**
 * @description Action creator that sends a NEW_NOTIFICATION action to the frontends notification-state along with the payload that includes message.
 * @param {Object} newNotification - The notification details
 * @param {String} newNotification.message - The notification message
 * @param {String} newNotification.isSuccess - Tells whether or not it is a succesfull (green) or unsuccessfull (red) message
 * @return {Object} action
 */
export const createNotification = (
  newNotification = { message: "", isSuccess: false }
) => ({
  type: NEW_NOTIFICATION,
  payload: {
    message: newNotification.message,
    isSuccess: newNotification.isSuccess,
  },
});

/**
 * @description Action creator that sends a REMOVE_NOTIFICATION-type action
 * @return {Object} action
 */
export const removeNotification = () => ({ type: REMOVE_NOTIFICATION });
