import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../Slice/counterSlice";
import userSlice from "../Slice/userSlice";

// eslint-disable-next-line react-refresh/only-export-components
export default configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice, 
  },
})


