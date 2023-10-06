import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/userSlice/userSlice";
import tutorReducer from "../features/tutorSlice/tutorSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    tutor: tutorReducer,
  },
});
