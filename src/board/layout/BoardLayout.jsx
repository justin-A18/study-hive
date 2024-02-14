import { useState } from 'react';
import { NavBar, SideBar, Modal } from './components';
import PropTypes from 'prop-types';

export const BoardLayout = ({ children }) => {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [isOpenMenu, setIsOpenMenu] = useState(false);

	const handleOpenModal = () => {
		setIsOpenModal((prev) => !prev);
		setIsOpenMenu(false);
	};

	const handleOpenMenu = () => {
		setIsOpenMenu((prev) => !prev);
	};

	return (
		<main className='w-full min-h-screen h-screen relative'>
			<section className='w-full h-full flex flex-col lg:flex-row items-center'>
				<NavBar onOpenMenu={handleOpenMenu} />
				<section className='w-full grid lg:grid-cols-[20rem_1fr] h-full'>
					<SideBar
						isOpen={isOpenMenu}
						onOpenModal={handleOpenModal}
					/>
					{children}
				</section>
			</section>

			<Modal
				isOpen={isOpenModal}
				onOpenModal={handleOpenModal}
				onOpenMenu={handleOpenMenu}
			/>
		</main>
	);
};

BoardLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
