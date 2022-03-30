/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNotification } from "../redux/actionCreators/notificationsActions";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    const timeout = setTimeout(() => dispatch(removeNotification()), 5000);
    return () => clearTimeout(timeout);
  });

  /**
   * Sets background-color of div
   * @returns Style
   */
  const setBackground = () => {
    if (notification.isSuccess) {
      return { backgroundColor: "green" };
    } else {
      return { backgroundColor: "red" };
    }
  };

  if (!notification || Object.keys(notification).length === 0) {
    return (
      <div data-testid="no-notification-component">No new notifications</div>
    );
  }

  return (
    <div data-testid="notification-component" style={setBackground()}>
      {notification.message}
    </div>
  );
};

export default Notification;
