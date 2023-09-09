  import { createSlice, PayloadAction } from "@reduxjs/toolkit";

  interface UserState {
    user: string; // You should replace 'any' with the actual type of your user object
  }

  const initialState: UserState = {
    user: '',
  };

  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      login: (state, action: PayloadAction<string>) => {
        state.user = action.payload;
      },
      signup:(state, action: PayloadAction<string>) =>{
          state.user = action.payload;

      },
      logout: (state) => {
        state.user = '';
      },
    },
  });

  export const { login, logout,signup } = userSlice.actions;
  export const selectUser = (state: { user: UserState }) => state.user.user

  export default userSlice.reducer;
