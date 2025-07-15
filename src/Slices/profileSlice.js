// Slices/profileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
  },
  reducers: {
    setUserProfile(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUserProfile } = profileSlice.actions;
export default profileSlice.reducer;
