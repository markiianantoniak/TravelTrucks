import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNotifications,
  removeNotification,
} from "../../redux/notificationSlice";
import styles from "./NotificationContainer.module.css";

const NotificationContainer = () => {
  const notifications = useSelector(selectNotifications);
  const dispatch = useDispatch();

  const handleClose = (id) => {
    dispatch(removeNotification(id));
  };

  return (
    <div className={styles.container}>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onClose={handleClose}
        />
      ))}
    </div>
  );
};

const Notification = ({ notification, onClose }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeNotification(notification.id));
    }, notification.duration);

    return () => clearTimeout(timer);
  }, [notification.id, notification.duration, dispatch]);

  const getTypeClass = (type) => {
    switch (type) {
      case "success":
        return styles.success;
      case "error":
        return styles.error;
      case "warning":
        return styles.warning;
      case "info":
      default:
        return styles.info;
    }
  };

  return (
    <div
      className={`${styles.notification} ${getTypeClass(notification.type)}`}
    >
      <div className={styles.content}>
        <span className={styles.message}>{notification.message}</span>
        <button
          className={styles.closeButton}
          onClick={() => onClose(notification.id)}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default NotificationContainer;
