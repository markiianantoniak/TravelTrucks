import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "./campersSlice";
import filtersReducer from "./filtersSlice";
import favoritesReducer from "./favoritesSlice";
import bookingReducer from "./bookingSlice";
import notificationReducer from "./notificationSlice";
export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
    booking: bookingReducer,
    notification: notificationReducer,
  },
});

export default store;
