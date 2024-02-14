import { Route, Routes } from 'react-router-dom';
import { AuthRouter } from '../auth/routes';
import { BoardRouter } from '../board/routes';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
	return (
		<Routes>
			<Route
				path='/auth/*'
				element={
					<PublicRoute>
						<AuthRouter />
					</PublicRoute>
				}
			/>

			<Route
				path='/*'
				element={
					<PrivateRoute>
						<BoardRouter />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
};
