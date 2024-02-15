import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	authLogged,
	setErrMessageEmail,
	setErrMessagePass,
} from '../../store/slices/authSlice';

export const useLogin = () => {
	const [errEmail, setErrEmail] = useState('');
	const [errPassword, setErrPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const loginEmailId = useId();
	const loginPasswordId = useId();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { user, errorEmail, errorPassword } = useSelector(
		(state) => state.auth
	);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		setErrEmail(errorEmail);
		setErrPassword(errorPassword);
	}, [errors, errorEmail, errorPassword]);

	const onSubmit = (e) => {
		if (e.email !== user.email) {
			dispatch(setErrMessageEmail('El email no existe, registrese por favor.'));
			return;
		}

		if (e.password !== user.password) {
			dispatch(setErrMessagePass('Contraseña incorrecta'));
			return;
		}

		dispatch(authLogged(true));

		reset();

		navigate('/', {
			replace: true,
		});
	};

	const handleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	return {
		errors,
		register,
		errEmail,
		errPassword,
		showPassword,
		loginEmailId,
		loginPasswordId,
		handleSubmit: handleSubmit(onSubmit),
		handleShowPassword,
	};
};
