import PropTypes from 'prop-types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { editList } from '../../../store/slices/boardSlice';

export const ListInfo = ({ isOpen, cardId, boardId, onEdited, listId }) => {
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: {
			title: '',
			description: 'change the text',
		},
	});
	const [isEditTitle, setIsEditTitle] = useState(false);
	const [isEditDescription, setIsEditDescription] = useState(false);
	const dispatch = useDispatch();

	const { boards } = useSelector((state) => state.board);
	const specificBoard = boards.find((board) => board.id === boardId);
	let specificCard = null;
	if (specificBoard) {
		specificCard = specificBoard.cards.find((card) => card.id === cardId);
	}
	const specificList = specificCard?.list.find((list) => list.id === listId);

	const DoubleClickTitle = (title) => {
		setIsEditTitle((prev) => !prev);
		setValue('title', title);
	};

	const DoubleClickDescription = (description) => {
		setIsEditDescription((prev) => !prev);
		setValue('description', description);
	};

	const onSubmit = (e) => {
		const newList = {
			title: e.title,
			description: e.description,
		};

		dispatch(editList({ boardId, cardId, listId, newList }));
		setIsEditTitle(false);
		setIsEditDescription(false);
	};

	return (
		<div
			className={`absolute bg-slate-200 w-[90%] sm:w-[500px] min-h-[200px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 rounded-md flex flex-col gap-4 shadow-xl  ${
				isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
			}`}>
			<header className='flex items-center justify-between'>
				<h2 className='text-xl whitespace-normal'>List Info</h2>
				<button
					className='flex items-center justify-center'
					onClick={() => onEdited(false)}>
					<i className='bx bx-x bx-md'></i>
				</button>
			</header>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<small>title:</small>
					<div onDoubleClick={() => DoubleClickTitle(specificList?.title)}>
						{!isEditTitle || listId !== specificList?.id ? (
							<h3 style={{ wordWrap: 'break-word' }}>{specificList?.title}</h3>
						) : (
							<input
								type='text'
								{...register('title')}
								className='w-full bg-transparent outline-none border-2 border-black p-1 px-2'
								autoFocus
							/>
						)}
					</div>
				</div>
				<div>
					<small>Description:</small>
					<div
						onDoubleClick={() =>
							DoubleClickDescription(specificList?.description)
						}>
						{!isEditDescription || listId !== specificList?.id ? (
							<p
								className='whitespace-normal'
								style={{ wordWrap: 'break-word' }}>
								{specificList?.description}
							</p>
						) : (
							<input
								type='text'
								{...register('description')}
								className='w-full bg-transparent outline-none border-2 border-black p-1 px-2'
								autoFocus
							/>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};

ListInfo.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	cardId: PropTypes.string.isRequired,
	listId: PropTypes.string.isRequired,
	boardId: PropTypes.string.isRequired,
	onEdited: PropTypes.func.isRequired,
};
