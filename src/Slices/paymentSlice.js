// Import necessary functions from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  loading: false,
  verified: false,
  paymentData: null,
};

// Create the slice
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPaymentVerified: (state, action) => {
      state.verified = true;
      state.paymentData = action.payload;
    },
    resetPaymentState: (state) => {
      state.loading = false;
      state.verified = false;
      state.paymentData = null;
    },
  },
});

// Export actions and reducer
export const {
  setPaymentLoading,
  setPaymentVerified,
  resetPaymentState,
} = paymentSlice.actions;

export default paymentSlice.reducer;
