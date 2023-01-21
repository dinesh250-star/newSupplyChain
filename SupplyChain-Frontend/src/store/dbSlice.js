import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

const dbSlice = createSlice({
  name: "db",
  initialState: {
    userAcc: "",
    loggedIn: false,
    role: "",
    count: 0,
    reload: false,
  },
  reducers: {
    reload(state, action) {
      state.reload = true;
    },
    userAccount(state, action) {
      state.userAcc = action.payload;
    },
    logIn(state, action) {
      state.loggedIn = true;
    },
  },
});

export const dbActions = dbSlice.actions;

export default dbSlice;
