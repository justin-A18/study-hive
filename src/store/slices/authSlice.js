import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_STATE = {
	user: {
		userName: '',
		email: '',
		password: '',
	},
	isLogged: false,
	errorEmail: '',
	errorPassword: '',
};

const initialState = (() => {
	const persistenceState = localStorage.getItem('__redux__state__');
	if (persistenceState) {
		return {
			user: JSON.parse(persistenceState).auth.user,
			isLogged: JSON.parse(persistenceState).auth.isLogged,
			errorEmail: '',
			errorPassword: '',
		};
	}

	return DEFAULT_STATE;
})();

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authRegister: (state, action) => {
			state.user = {
				username: action.payload.username,
				email: action.payload.email,
				password: action.payload.password,
			};
		},
		authLogged: (state, action) => {
			state.isLogged = action.payload;
		},
		setErrMessageEmail: (state, action) => {
			state.errorEmail = action.payload;
		},
		setErrMessagePass: (state, action) => {
			state.errorPassword = action.payload;
		},
	},
});

export const {
	authRegister,
	authLogged,
	setErrMessageEmail,
	setErrMessagePass,
} = authSlice.actions;
