import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getInitial } from '../../helpers/getInitial';
import { authLogged } from '../../../store/slices/authSlice';

export const NavBar = ({ onOpenMenu }) => {
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(authLogged(false));
	};

	return (
		<aside className='bg-[#0747A6] w-full h-[4rem] lg:w-[5rem] lg:h-full p-4'>
			<nav className='w-full h-full flex lg:flex-col items-center justify-between'>
				<ul className='flex lg:flex-col items-center gap-5'>
					<li className='block lg:hidden'>
						<button
							className='text-white size-10 rounded-lg hover:bg-white hover:text-black flex items-center justify-center transition-colors duration-300'
							onClick={onOpenMenu}>
							<i className='bx bx-menu bx-md'></i>
						</button>
					</li>

					<li>
						<Link to='/'>
							<img
								className='size-10'
								src='../../../logo.svg'
								alt='logo'
							/>
						</Link>
					</li>
				</ul>

				<div className='flex flex-col items-center gap-4'>
					<button
						className='flex items-center justify-center size-10 text-white hover:text-red-600 transition-colors duration-300'
						onClick={handleLogout}>
						<i className='bx bx-log-out-circle bx-md'></i>
					</button>

					<span className='size-10 bg-orange-500 flex items-center justify-center text-white rounded-full text-lg'>
						{getInitial(user?.username)}
					</span>
				</div>
			</nav>
		</aside>
	);
};

NavBar.propTypes = {
	onOpenMenu: PropTypes.func.isRequired,
};
