import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  nextId: 1,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const notification = {
        id: state.nextId++,
        message: action.payload.message,
        type: action.payload.type || "info",
        duration: action.payload.duration || 5000,
        timestamp: Date.now(),
      };
      state.notifications.push(notification);
      return notification.id;
    },

    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },

    clearAllNotifications: (state) => {
      state.notifications = [];
    },

    addSuccessNotification: (state, action) => {
      const notification = {
        id: state.nextId++,
        message: action.payload,
        type: "success",
        duration: 4000,
        timestamp: Date.now(),
      };
      state.notifications.push(notification);
    },

    addErrorNotification: (state, action) => {
      const notification = {
        id: state.nextId++,
        message: action.payload,
        type: "error",
        duration: 6000,
        timestamp: Date.now(),
      };
      state.notifications.push(notification);
    },

    addWarningNotification: (state, action) => {
      const notification = {
        id: state.nextId++,
        message: action.payload,
        type: "warning",
        duration: 5000,
        timestamp: Date.now(),
      };
      state.notifications.push(notification);
    },

    addInfoNotification: (state, action) => {
      const notification = {
        id: state.nextId++,
        message: action.payload,
        type: "info",
        duration: 4000,
        timestamp: Date.now(),
      };
      state.notifications.push(notification);
    },
  },
});

export const {
  addNotification,
  removeNotification,
  clearAllNotifications,
  addSuccessNotification,
  addErrorNotification,
  addWarningNotification,
  addInfoNotification,
} = notificationSlice.actions;

export const selectNotifications = (state) => state.notification.notifications;
export const selectLatestNotification = (state) => {
  const notifications = state.notification.notifications;
  return notifications.length > 0
    ? notifications[notifications.length - 1]
    : null;
};

export const addTimedNotification = (notification) => (dispatch, getState) => {
  dispatch(addNotification(notification));

  const state = getState();
  const notifications = state.notification.notifications;
  const latestNotification = notifications[notifications.length - 1];

  if (latestNotification) {
    const duration = notification.duration || 5000;
    setTimeout(() => {
      dispatch(removeNotification(latestNotification.id));
    }, duration);
  }
};

export const addTimedSuccessNotification =
  (message, duration = 4000) =>
  (dispatch, getState) => {
    dispatch(addSuccessNotification(message));

    const state = getState();
    const notifications = state.notification.notifications;
    const latestNotification = notifications[notifications.length - 1];

    if (latestNotification) {
      setTimeout(() => {
        dispatch(removeNotification(latestNotification.id));
      }, duration);
    }
  };

export const addTimedErrorNotification =
  (message, duration = 6000) =>
  (dispatch, getState) => {
    dispatch(addErrorNotification(message));

    const state = getState();
    const notifications = state.notification.notifications;
    const latestNotification = notifications[notifications.length - 1];

    if (latestNotification) {
      setTimeout(() => {
        dispatch(removeNotification(latestNotification.id));
      }, duration);
    }
  };

export default notificationSlice.reducer;
