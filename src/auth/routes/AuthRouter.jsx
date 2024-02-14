import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../pages';
import { AuthLayout } from '../layout/AuthLayout';

export const AuthRouter = () => {
	return (
		<AuthLayout>
			<Routes>
				<Route
					path='/login'
					element={<LoginPage />}
				/>
				<Route
					path='/register'
					element={<RegisterPage />}
				/>

				<Route
					path='/*'
					element={<Navigate to='/auth/login' />}
				/>
			</Routes>
		</AuthLayout>
	);
};
