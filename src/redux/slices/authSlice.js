import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isCallLogin: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsCallLogin: (state, action) => {
      state.isCallLogin = action.payload;
    },
  },
});

export const { setIsCallLogin } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
