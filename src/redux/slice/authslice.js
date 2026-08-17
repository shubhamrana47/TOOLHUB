import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

const initialState = {
  token: storedToken || null,
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedToken,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;

      // Redux
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;

      // Local Storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("TOKEN IN LOCAL STORAGE:", localStorage.getItem("token"));

    },

    logout: (state) => {
      // Redux
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      // Local Storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;