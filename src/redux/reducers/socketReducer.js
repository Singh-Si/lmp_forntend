import { createSlice } from "@reduxjs/toolkit";

var initialState = {
  Userid: null,
  usertype: null,
  username: null,
  socket: null,
  visitor: localStorage.getItem("visitor")
    ? parseInt(localStorage.getItem("visitor"))
    : null,
  verifyemail: localStorage.getItem("verifyemail")
    ? JSON.parse(localStorage.getItem("verifyemail")).verifyemail
    : false,
};
export const SocketData = createSlice({
  name: "SocketData",
  initialState: initialState,
  reducers: {
    setUserDetails: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});
// Action creators are generated for each case reducer function
export const { setUserDetails } = SocketData.actions;

export default SocketData.reducer;
