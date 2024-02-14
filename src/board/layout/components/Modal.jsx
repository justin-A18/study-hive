import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addNewBoard } from '../../../store/slices/boardSlice';

export const Modal = ({ isOpen, onOpenModal, onOpenMenu }) => {
	const dispatch = useDispatch();

	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			nameboard: '',
		},
	});

	const onSubmit = (e) => {
		if (e.nameboard.lenght < 1) return;

		const newBoard = {
			id: uuidv4(),
			title: e.nameboard,
			cards: [],
		};

		dispatch(addNewBoard(newBoard));
		reset();

		onOpenModal();
		onOpenMenu();
	};

	return (
		<div
			className={`absolute bg-slate-200 w-[90%] sm:w-[500px] min-h-[200px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 rounded-md flex-col gap-4 shadow-xl ${
				isOpen ? 'flex' : 'hidden'
			}`}>
			<header className='flex items-center justify-between'>
				<h2 className='text-xl'>New Board</h2>
				<button
					className='flex items-center justify-center'
					onClick={onOpenModal}>
					<i className='bx bx-x bx-md'></i>
				</button>
			</header>
			<form
				className='flex flex-col gap-4 w-full h-full'
				onSubmit={handleSubmit(onSubmit)}>
				<div className='w-full'>
					<label htmlFor='nameboard'>Board Name</label>
					<input
						type='text'
						{...register('nameboard')}
						id='nameboard'
						className='bg-transparent border-2 outline-none border-black p-3 rounded-md w-full h-12 my-2'
						placeholder='Ej: Create Desing'
					/>
				</div>
				<button className='bg-[#0747A6] hover:opacity-70 text-white p-3 rounded-md'>
					Create Board
				</button>
			</form>
		</div>
	);
};

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onOpenModal: PropTypes.func.isRequired,
	onOpenMenu: PropTypes.func.isRequired,
};
