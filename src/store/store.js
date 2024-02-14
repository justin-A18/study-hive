import { configureStore } from '@reduxjs/toolkit';
import { boardSlice } from './slices/boardSlice';
import { authSlice } from './slices/authSlice';

export const store = configureStore({
	reducer: {
		board: boardSlice.reducer,
		auth: authSlice.reducer,
	},
});
