import { createSlice } from "@reduxjs/toolkit";
const getFromLocalStorage = (key) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};
const initialState = {
  accesstoken: null || getFromLocalStorage("accesstoken"),
  email: "" || getFromLocalStorage("email"),
};
export const Userslice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setToken(state, action) {
      console.log("payload value", action.payload);
      state.accesstoken = action.payload.accesstoken;
      state.email = action.payload.email;
      localStorage.setItem("accesstoken", state.accesstoken);
      localStorage.setItem("email", state.email);
      // console.log("token value is initialised in the reducer", action.payload);
    },
    logout(state) {
      localStorage.removeItem("accesstoken");
      localStorage.removeItem("email");
      state.accesstoken = null;
      state.email = null;
    },
  },
});

export const { setToken, logout } = Userslice.actions;
export default Userslice.reducer;
