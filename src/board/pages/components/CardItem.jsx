import PropTypes from 'prop-types';
import { useState } from 'react';
import { CreateList } from './CreateList';
import { useDispatch, useSelector } from 'react-redux';
import { getInitial } from '../../helpers/getInitial';
import { useForm } from 'react-hook-form';
import { deleteCard, deleteList, editCard } from '../../../store/slices/boardSlice';
import { ListInfo } from './ListInfo';

export const CardItem = ({ card, boardId }) => {
	const [isOpenList, setIsOpenList] = useState(false);
	const [isEdited, setIsEdited] = useState(false);

	const [cardId, setCardId] = useState('');
	const [list, setList] = useState({});
	const [isEditedList, setIsEditedList] = useState(false);

	const { handleSubmit, register, setValue } = useForm();

	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleOpenList = () => {
		setIsOpenList((prev) => !prev);
	};

	const handleEdited = (id, title) => {
		setIsEdited((prev) => !prev);
		setCardId(id);
		setValue('cardEdit', title);
	};

	const onSubmit = (e) => {
		if (e.cardEdit === '') return;

		dispatch(
			editCard({
				boardId,
				cardId,
				newValue: e.cardEdit,
			})
		);

		setIsEdited(false);
	};

	const handleEditList = (idCard, List) => {
		setCardId(idCard);
		setList(List);
		setIsEditedList((prev) => !prev);
	};

	return (
		<>
			<article className='flex-[0_0_auto] w-[18rem] bg-[#F4F5F7] min-h-32 p-3 flex flex-col gap-6'>
				<header
					className='w-full flex'
					onDoubleClick={() => handleEdited(card.id, card.title)}>
					{!isEdited || cardId !== card.id ? (
						<div className='flex items-center w-full h-8 justify-between'>
							<h3 className='uppercase text-[#8B95A6] font-bold px-3  whitespace-normal'>
								{card.title}
							</h3>

							<button
								className='px-3 text-red-500'
								onClick={() =>
									dispatch(deleteCard({ boardId, cardId: card.id }))
								}>
								<i className='bx bx-trash-alt bx-sm'></i>
							</button>
						</div>
					) : (
						<form
							className='w-full h-8 flex items-center'
							onSubmit={handleSubmit(onSubmit)}>
							<input
								type='text'
								className='w-full text-[#8B95A6] font-bold uppercase bg-transparent outline-none px-3'
								autoFocus
								{...register('cardEdit')}
							/>
						</form>
					)}
				</header>
				<ul className='flex flex-col items-center gap-2 w-full'>
					{card.list.map((list, index) => (
						<li
							key={index}
							id={list.id}
							className='bg-white w-full p-2 min-h-20 flex flex-col gap-10 relative'>
							<p
								className='pr-8 whitespace-normal'
								style={{ wordWrap: 'break-word' }}>
								{list.title}
							</p>
							<button
								className='absolute top-2 right-2 text-[#0747A6]'
								onClick={() => handleEditList(card.id, list)}>
								<i className='bx bx-edit bx-sm'></i>
							</button>
							<button
								className='px-3 text-red-500 absolute top-9 right-[-3px]'
								onClick={() =>
									dispatch(
										deleteList({ boardId, cardId: card.id, listId: list.id })
									)
								}>
								<i className='bx bx-trash-alt bx-sm'></i>
							</button>
							<footer className='flex items-center justify-end gap-2'>
								<h2 className='text-[#8B95A6]'>{user?.username}</h2>
								<span className='size-8 bg-orange-500 flex items-center justify-center text-white rounded-full'>
									{getInitial(user?.username)}
								</span>
							</footer>
						</li>
					))}

					<li className='w-full p-2 h-10 cursor-pointer flex items-center justify-center gap-2 bg-white hover:bg-[#e1e1e1] transition-colors duration-300'>
						<button
							className='w-full h-full'
							onClick={handleOpenList}>
							<i className='bx bx-plus'></i>
						</button>
					</li>
				</ul>
			</article>

			<CreateList
				cardId={card.id}
				boardId={boardId}
				isOpen={isOpenList}
				onOpenModal={handleOpenList}
			/>

			<ListInfo
				isOpen={isEditedList}
				cardId={cardId}
				onEdited={setIsEditedList}
				boardId={boardId}
				listId={list.id}
			/>
		</>
	);
};

CardItem.propTypes = {
	card: PropTypes.object.isRequired,
	boardId: PropTypes.string.isRequired,
};
