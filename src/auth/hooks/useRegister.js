import { useId, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authRegister } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export const useRegister = () => {
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			username: '',
			password: '',
		},
	});

	const registerEmailId = useId();
	const registerPasswordId = useId();
	const registerUserNameId = useId();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	const onSubmit = (e) => {
		const userData = {
			username: e.username,
			email: e.email,
			password: e.password,
		};

		dispatch(authRegister(userData));
		reset();

		navigate('/auth/login', {
			replace: true,
		});
	};

	return {
		errors,
		register,
		showPassword,
		registerEmailId,
		registerUserNameId,
		registerPasswordId,
		handleShowPassword,
		handleSubmit: handleSubmit(onSubmit),
	};
};
