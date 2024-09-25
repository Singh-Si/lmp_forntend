import { configureStore } from "@reduxjs/toolkit";
import MotoformDataReducer from "./reducers/MotoformDataReducerSlice";
import SocketReducer from "./reducers/socketReducer";
import GroupMedicalReducer from "./reducers/GroupMedicalDataReducerSlice";
import YachtReducer from "./reducers/YachtDataReducerSlice";

export const store = configureStore({
  reducer: {
    MotoformDataReducer,
    SocketReducer,
    GroupMedicalReducer,
    YachtReducer
  },
});
