import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addNewList } from '../../../store/slices/boardSlice';

export const CreateList = ({ isOpen, onOpenModal, cardId, boardId }) => {
	const { handleSubmit, register, reset } = useForm({
		defaultValues: {
			namelist: '',
		},
	});

	const dispatch = useDispatch();

	const onSubmit = (e) => {
		const newList = {
			id: uuidv4(),
			title: e.namelist,
			description: '',
			comments: [],
		};

		dispatch(
			addNewList({
				cardId,
				cardList: newList,
				boardId,
			})
		);

		reset();
		onOpenModal();
	};

	return (
		<div
			className={`absolute bg-slate-200 w-[90%] sm:w-[500px] min-h-[200px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 rounded-md ${
				isOpen ? 'flex' : 'hidden'
			} flex-col gap-4 shadow-xl`}>
			<header className='flex items-center justify-between'>
				<h2 className='text-xl'>New List</h2>
				<button
					className='flex items-center justify-center'
					onClick={onOpenModal}>
					<i className='bx bx-x bx-md'></i>
				</button>
			</header>
			<form
				className='flex flex-col gap-4 w-full h-full'
				onSubmit={handleSubmit(onSubmit)}>
				<div className='w-full flex flex-col'>
					<label htmlFor='namelist'>List Name</label>
					<input
						type='text'
						{...register('namelist')}
						id='namelist'
						className='bg-transparent border-2 outline-none border-black p-3 rounded-md w-full h-12 my-2'
						placeholder='Ej: Implement feedback collector'
					/>
				</div>
				<button className='bg-[#0747A6] hover:opacity-70 text-white p-3 rounded-md'>
					Create List
				</button>
			</form>
		</div>
	);
};

CreateList.propTypes = {
	cardId: PropTypes.string.isRequired,
	boardId: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onOpenModal: PropTypes.func.isRequired,
};
