import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({ children }) => {
	const { isLogged } = useSelector((state) => state.auth);

	return isLogged ? children : <Navigate to='/auth/login' />;
};

PrivateRoute.propTypes = {
	children: PropTypes.node.isRequired,
};
