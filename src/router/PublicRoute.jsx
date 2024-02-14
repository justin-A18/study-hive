import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PublicRoute = ({ children }) => {
	const { isLogged } = useSelector((state) => state.auth);
	return isLogged ? <Navigate to='/' /> : children;
};

PublicRoute.propTypes = {
	children: PropTypes.node.isRequired,
};
