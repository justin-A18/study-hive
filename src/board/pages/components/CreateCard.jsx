import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addNewCard } from '../../../store/slices/boardSlice';

export const CreateCard = ({ isOpen, onOpenModal, id }) => {
	const { handleSubmit, register, reset } = useForm({
		defaultValues: {
			namecard: '',
		},
	});

	const dispatch = useDispatch();

	const onSubmit = (e) => {
		if (e.namecard.length < 1) return;

		const newCard = {
			id: uuidv4(),
			title: e.namecard,
			list: [],
		};

		dispatch(
			addNewCard({
				boardId: id,
				boardCard: newCard,
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
				<h2 className='text-xl'>New Card</h2>
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
					<label htmlFor='namecard'>Card Name</label>
					<input
						type='text'
						{...register('namecard')}
						id='namecard'
						className='bg-transparent border-2 outline-none border-black p-3 rounded-md w-full h-12 my-2'
						placeholder='Ej: To Do'
					/>
				</div>
				<button className='bg-[#0747A6] hover:opacity-70 text-white p-3 rounded-md'>
					Create Card
				</button>
			</form>
		</div>
	);
};

CreateCard.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onOpenModal: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
};
