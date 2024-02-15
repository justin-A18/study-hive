import { configureStore } from '@reduxjs/toolkit';
import { boardSlice } from './slices/boardSlice';
import { authSlice } from './slices/authSlice';

const persistenceMiddleware = (store) => (next) => (action) => {
	next(action);
	localStorage.setItem('__redux__state__', JSON.stringify(store.getState()));
};

export const store = configureStore({
	reducer: {
		board: boardSlice.reducer,
		auth: authSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => [
		persistenceMiddleware,
		...getDefaultMiddleware(),
	],
});
