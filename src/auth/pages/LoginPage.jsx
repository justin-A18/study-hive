import { useForm } from 'react-hook-form';
import { useEffect, useId, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	authLogged,
	setErrMessageEmail,
	setErrMessagePass,
} from '../../store/slices/authSlice';

export const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [errEmail, setErrEmail] = useState('');
	const [errPassword, setErrPassword] = useState('');
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { user, errorEmail, errorPassword } = useSelector(
		(state) => state.auth
	);

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

	useEffect(() => {
		setErrEmail(errorEmail);
		setErrPassword(errorPassword);
	}, [errors, errorEmail, errorPassword]);

	const loginEmailId = useId();
	const loginPasswordId = useId();

	const handleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	const onSubmit = (e) => {
		if (e.email !== user.email) {
			dispatch(setErrMessageEmail('El email no existe, registrese por favor.'));
			return;
		}

		if (e.password !== user.password) {
			dispatch(setErrMessagePass('Contraseña incorrecta'));
			return;
		}

		const logged = true;
		dispatch(authLogged(logged));

		reset();

		navigate('/', {
			replace: true,
		});
	};

	return (
		<form
			className='flex flex-col gap-5'
			onSubmit={handleSubmit(onSubmit)}>
			<legend className='text-2xl'>Login</legend>
			<div className='w-full flex flex-col gap-1'>
				<div className='w-full h-12 flex items-center'>
					<label
						htmlFor={loginEmailId}
						className='size-12 flex items-center text-[#e1e1e1] justify-center border-2 border-[#e1e1e1] border-r-0'>
						<i className='bx bxs-envelope bx-sm'></i>
					</label>
					<input
						type='email'
						{...register('email', {
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message:
									'Ingrese un correo electrónico válido "example@dominio.com"',
							},
						})}
						id={loginEmailId}
						className='w-full h-full px-2 outline-none border-2 border-[#e1e1e1]'
						placeholder='E-mail'
					/>
				</div>

				<span className='text-sm text-red-500 font-medium'>{errEmail}</span>
				{errors.email && (
					<span className='text-sm text-red-500 font-medium'>
						{errors.email?.message}
					</span>
				)}
			</div>

			<div className='w-full flex flex-col gap-1'>
				<div className='flex items-center w-full h-12 relative'>
					<label
						htmlFor={loginPasswordId}
						className='size-12 flex items-center text-[#e1e1e1] justify-center border-2 border-[#e1e1e1] border-r-0'>
						<i className='bx bxs-check-shield bx-sm'></i>
					</label>
					<input
						type={showPassword ? 'text' : 'password'}
						autoComplete='off'
						{...register('password', {
							required: 'La contraseña es requerida',
							minLength: {
								value: 8,
								message: 'La contraseña debe tener al menos 8 caracteres',
							},
						})}
						id={loginPasswordId}
						className='w-full h-full px-2 outline-none border-2 border-[#e1e1e1]'
						placeholder='Password'
					/>

					<button
						className='absolute right-3'
						onClick={handleShowPassword}
						type='button'>
						<i className='bx bx-low-vision'></i>
					</button>
				</div>
				<span className='text-sm text-red-500 font-medium'>{errPassword}</span>
				{errors.password && (
					<span className='text-sm text-red-500 font-medium'>
						{errors.password?.message}
					</span>
				)}
			</div>

			<div className='flex justify-end'>
				<button
					className='text-white bg-[#4786FF] uppercase font-medium rounded-sm hover:opacity-[.8] transition-opacity px-5 py-3 text-sm md:text-md'
					type='submit'>
					Login
				</button>
			</div>

			<p className='mt-10'>
				You do not have an account?
				<Link
					to='/auth/register'
					className='text-[#4786FF] ml-2 underline decoration-1'>
					Sign up
				</Link>
			</p>
		</form>
	);
};
