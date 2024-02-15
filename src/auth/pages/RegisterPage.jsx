import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';

export const RegisterPage = () => {
	const {
		errors,
		register,
		handleSubmit,
		showPassword,
		registerEmailId,
		registerPasswordId,
		registerUserNameId,
		handleShowPassword,
	} = useRegister();

	return (
		<form
			className='flex flex-col gap-5'
			onSubmit={handleSubmit}>
			<legend className='text-2xl'>Creat your account</legend>

			<div className='w-full flex flex-col gap-1'>
				<div className='flex items-center w-full h-12'>
					<label
						htmlFor={registerUserNameId}
						className='size-12 flex items-center text-[#e1e1e1] justify-center border-2 border-[#e1e1e1] border-r-0'>
						<i className='bx bxs-user bx-sm'></i>
					</label>
					<input
						type='text'
						{...register('username', {
							pattern: {
								value: /^[a-zA-Z0-9_]+(?:-[a-zA-Z0-9_]+)*$/,
								message:
									'El nombre de usuario solo puede contener letras, números y guiones bajos',
							},
						})}
						required
						id={registerUserNameId}
						className='w-full h-full px-2 outline-none border-2 border-[#e1e1e1]'
						placeholder='Username'
					/>
				</div>
				<span className='text-sm text-red-500 font-medium'>
					{errors.username?.message}
				</span>
			</div>

			<div className='w-full flex flex-col gap-1'>
				<div className='flex items-center w-full h-12'>
					<label
						htmlFor={registerEmailId}
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
						required
						id={registerEmailId}
						className='w-full h-full px-2 outline-none border-2 border-[#e1e1e1]'
						placeholder='E-mail'
					/>
				</div>
				<span className='text-sm text-red-500 font-medium'>
					{errors.email?.message}
				</span>
			</div>

			<div className='w-full flex flex-col gap-1'>
				<div className='flex items-center w-full h-12 relative'>
					<label
						htmlFor={registerPasswordId}
						className='size-12 flex items-center text-[#e1e1e1] justify-center border-2 border-[#e1e1e1] border-r-0'>
						<i className='bx bxs-check-shield bx-sm'></i>
					</label>
					<input
						type={showPassword ? 'text' : 'password'}
						{...register('password', {
							minLength: {
								value: 8,
								message: 'La contraseña debe tener al menos 8 caracteres',
							},
						})}
						id={registerPasswordId}
						required
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
				<span className='text-sm text-red-500 font-medium'>
					{errors.password?.message}
				</span>
			</div>

			<div className='flex justify-end'>
				<button
					className='text-white bg-[#4786FF] uppercase font-medium rounded-sm hover:opacity-[.8] transition-opacity px-5 py-3 text-sm md:text-md'
					type='submit'>
					Register
				</button>
			</div>

			<p className='mt-7'>
				Do you already have an account?
				<Link
					to='/auth/login'
					className='text-[#4786FF] ml-2 underline decoration-1'>
					log in
				</Link>
			</p>
		</form>
	);
};
