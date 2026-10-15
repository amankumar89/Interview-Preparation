import { configureStore } from "@reduxjs/toolkit";
import learningReducer from "../features/learning/learningSlice";

export const store = configureStore({
  reducer: {
    learning: learningReducer,
  },
});
