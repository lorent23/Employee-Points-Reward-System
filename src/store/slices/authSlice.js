import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  token: localStorage.getItem("token") || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("token", payload.token);
      state.user = payload.user;
      state.token = payload.token;
    },
    logout: (state) => {
      localStorage.clear();
      state.user = initialState.user;
      state.token = initialState.token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
