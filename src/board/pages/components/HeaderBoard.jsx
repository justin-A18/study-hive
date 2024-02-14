import PropTypes from 'prop-types';

export const HeaderBoard = ({ title, onOpenModal }) => {
	return (
		<header className='flex flex-col gap-4 w-full lg:max-w-[600px] mx-auto fixed'>
			<h1 className='text-2xl uppercase font-medium'>Board Name: {title}</h1>
			<div className='w-[90%] flex items-center gap-4'>
				<input
					type='search'
					placeholder='Search your cards'
					className='bg-transparent border-2 outline-none border-black p-3 rounded-md w-full sm:w-[20rem] h-12'
					name='search-cards'
				/>

				<button
					className='bg-[#e1e1e1] w-14 sm:w-12 h-12 rounded-md flex items-center justify-center hover:opacity-80'
					onClick={onOpenModal}>
					<i className='bx bx-plus bx-sm'></i>
				</button>
			</div>
		</header>
	);
};

HeaderBoard.propTypes = {
	title: PropTypes.string.isRequired,
	onOpenModal: PropTypes.func.isRequired,
};
