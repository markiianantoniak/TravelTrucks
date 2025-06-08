import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    location: "",
    form: "",
    features: {
      AC: false,
      automatic: false,
      kitchen: false,
      TV: false,
      bathroom: false,
    },
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setForm: (state, action) => {
      state.form = action.payload;
    },
    toggleFeature: (state, action) => {
      const feature = action.payload;
      state.features[feature] = !state.features[feature];
    },
    clearFilters: (state) => {
      state.location = "";
      state.form = "";
      state.features = {
        AC: false,
        automatic: false,
        kitchen: false,
        TV: false,
        bathroom: false,
      };
    },
  },
});

export const { setLocation, setForm, toggleFeature, clearFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
