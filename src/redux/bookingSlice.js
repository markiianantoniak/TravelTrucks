import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const submitBooking = createAsyncThunk(
  "booking/submit",
  async (bookingData, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        id: Date.now(),
        ...bookingData,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  bookings: [],
  currentBooking: null,
  isLoading: false,
  error: null,
  isSubmitting: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    resetCurrentBooking: (state) => {
      state.currentBooking = null;
    },

    addBooking: (state, action) => {
      state.bookings.push({
        id: Date.now(),
        ...action.payload,
        status: "pending",
        createdAt: new Date().toISOString(),
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitBooking.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(submitBooking.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.currentBooking = action.payload;
        state.bookings.push(action.payload);
        state.error = null;
      })
      .addCase(submitBooking.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload || "Failed to submit booking";
      });
  },
});

export const { clearError, resetCurrentBooking, addBooking } =
  bookingSlice.actions;

export const selectBookings = (state) => state.booking.bookings;
export const selectCurrentBooking = (state) => state.booking.currentBooking;
export const selectBookingLoading = (state) => state.booking.isLoading;
export const selectBookingError = (state) => state.booking.error;
export const selectIsSubmitting = (state) => state.booking.isSubmitting;

export default bookingSlice.reducer;
