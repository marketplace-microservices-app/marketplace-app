import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  user: null, // No user is logged in initially
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // Save user details
    },
    logout: (state) => {
      state.user = null; // Clear user data on logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
