import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: null,
};

const socketSlice = createSlice({
	name: 'socket',
	initialState,
	reducers: {
		setSocket: (state, actions) => {
			state.data = actions.payload;
		},
	},
});

export const { setSocket } = socketSlice.actions;

const socketReducer = socketSlice.reducer;
export default socketReducer;
