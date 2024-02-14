import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: {
			userName: '',
			email: '',
			password: '',
		},
		isLogged: false,
		errorEmail: '',
		errorPassword: '',
	},
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
