import {
  CLEAR_ORDERS,
  CLEAR_USERS,
  INIT_AUTH,
  REMOVE_AUTH,
} from "../constants";
import { createNotification } from "./notificationsActions";

// Use this regex for email validation
const validEmailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// Invalid Auth Messages:
export const invalidAuth = {
  name: "Name too short",
  email: "Invalid email",
  password: "Password too short",
  passwordMismatch: "Password missmatch",
};

// Valid auth messages.
export const validAuth = {
  welcome: function (name) {
    return `Welcome to my store, ${name}!`;
  },
  welcomeBack: "Welcome back!",
};

//AUTH (THUNK) ACTION CREATORS
/**
 *
 * @description Asynchronous thunk that uses backends /api/check-status path to check whether or not there is the correct browser-cookie and whether or not that browser-cookie is valid. If it's succesful, Dispatches
 * 1) INIT_AUTH with user as payload.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 * @returns {Function} Asynchronous action
 */
export const initAuth = () => {
  return async (dispatch) => {
    const response = await fetch("/api/check-status", {
      headers: {
        Accept: "application/json",
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

    if (!data.user) {
      dispatch({
        type: INIT_AUTH,
      });
    } else {
      dispatch({
        type: INIT_AUTH,
        payload: data.user,
      });
    }
  };
};

/**
 * @description Asynchronous thunk that handles validation for logInCreds (check Login and Registration validation from assignment instructions). Expects for a successful login-response from server, before dispatches
 * 1) INIT_AUTH with user as payload
 * 2) succesfull notification with validAuth.welcomeBack as message.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull notification.
 * @param {object} logInCreds - The credentials used to login, contains username and password
 * @returns {Function} Asynchronous action
 */
export const logIn = (logInCreds) => {
  return async (dispatch) => {
    if (!RegExp(validEmailRegex).test(logInCreds.email)) {
      return dispatch(
        createNotification({
          isSuccess: false,
          message: invalidAuth.email,
        })
      );
    }

    if (logInCreds.password.length < 10) {
      return dispatch(
        createNotification({
          isSuccess: false,
          message: invalidAuth.password,
        })
      );
    }

    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(logInCreds),
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
      type: INIT_AUTH,
      payload: data.user,
    });

    dispatch(
      createNotification({
        isSuccess: true,
        message: validAuth.welcomeBack,
      })
    );
  };
};

/**
 * @description Asynchronous thunk that awaits for a successful logout-response from server, before dispatches
 * the actions with types of
 * 1) REMOVE_AUTH,
 * 2) CLEAR_ORDERS and
 * 3) CLEAR_USERS as well as
 * 4) NEW_NOTIFICATION with succesfull message from the backend as payload to the reducers.
 * @returns {Function} Asynchronous action
 */
export const logOut = () => {
  return async (dispatch) => {
    const response = await fetch("/api/logout", {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      return;
    }

    dispatch({ type: REMOVE_AUTH });
    dispatch({ type: CLEAR_ORDERS });
    dispatch({ type: CLEAR_USERS });
    dispatch(createNotification({ isSuccess: true, message: data.message }));
  };
};

/**
 * @description Asynchronous thunk that handles registeration events. Handles validation for registerCreds (check Login and Registration validation from assignment instructions). If the response is ok, Dispatches
 * 1) an INIT_AUTH-type action to reducers with the received user as payload.
 * 2) a successful NEW_NOTIFICATION-type action to reducers with validAuth.welcome(name) as message.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull notification. If the error itself is an object, then it should pass whatever is inside the object.
 * @param {object} registerCreds - The data of the user
 * @returns {Function} Asynchronous action
 */
export const register = (registerCreds) => {
  return async (dispatch) => {
    if (registerCreds.name && registerCreds.name.length < 4) {
      return dispatch(
        createNotification({
          isSuccess: false,
          message: invalidAuth.name,
        })
      );
    }

    if (!RegExp(validEmailRegex).test(registerCreds.email)) {
      return dispatch(
        createNotification({
          isSuccess: false,
          message: invalidAuth.email,
        })
      );
    }

    if (registerCreds.password.length < 10) {
      return dispatch(
        createNotification({
          isSuccess: false,
          message: invalidAuth.password,
        })
      );
    }

    if (registerCreds.password !== registerCreds.passwordConfirmation) {
      return dispatch(
        createNotification({
          isSuccess: false,
          message: invalidAuth.passwordMismatch,
        })
      );
    }

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(registerCreds),
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
      type: INIT_AUTH,
      payload: data.user,
    });

    dispatch(
      createNotification({
        isSuccess: true,
        message: validAuth.welcome(data.user.name),
      })
    );
  };
};
