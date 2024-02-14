import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage, BoardPage } from '../pages';
import { BoardLayout } from '../layout/BoardLayout';
export const BoardRouter = () => {
	return (
		<BoardLayout>
			<Routes>
				<Route
					path='/'
					element={<HomePage />}
				/>

				<Route
					path='/board/:id'
					element={<BoardPage />}
				/>

				<Route
					path='/*'
					element={<Navigate to='/' />}
				/>
			</Routes>
		</BoardLayout>
	);
};
