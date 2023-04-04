import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {
    info: null,
    accessToken: null,
    isLogin: false,
  },
  error: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data.info = action.payload;
      state.data.isLogin = true;
    },
    updateUserInfo: (state, action) => {
      state.data.info = { ...state.data.info, ...action.payload };
    },
    setAccessToken: (state, action) => {
      state.data.accessToken = action.payload;
      state.data.isLogin = true;
    },
    logout: (state, action) => {
      state.data.isLogin = false;
      state.data.info = null;
      state.data.accessToken = null;
    },
  },
});

export const { setUser, setAccessToken, logout, updateUserInfo } =
  userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
