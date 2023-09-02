import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  tutor: string; // You should replace 'any' with the actual type of your user object
}

const initialState: UserState = {
  tutor: '',
};

const tutorSlice = createSlice({
  name: "tutor",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.tutor = action.payload;
    },
    signup:(state, action: PayloadAction<string>) =>{
        state.tutor = action.payload;

    },
    logout: (state) => {
      state.tutor = '';
    },
  },
});

export const { login, logout,signup } = tutorSlice.actions;
export const selectTutor = (state: { tutor: UserState }) => state.tutor.tutor;

export default tutorSlice.reducer;
