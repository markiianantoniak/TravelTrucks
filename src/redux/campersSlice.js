import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../services/api";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (params, { rejectWithValue }) => {
    try {
      const data = await api.getCampers(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await api.getCamperById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    currentCamper: null,
    total: 0,
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
  },
  reducers: {
    clearCampers: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.total = 0;
    },
    resetCurrentCamper: (state) => {
      state.currentCamper = null;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;

        if (state.page === 1) {
          state.items = action.payload.items;
        } else {
          state.items = [...state.items, ...action.payload.items];
        }

        state.total = action.payload.total;
        state.hasMore = action.payload.items.length > 0;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCamperById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCamper = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCampers, resetCurrentCamper, incrementPage } =
  campersSlice.actions;
export default campersSlice.reducer;
