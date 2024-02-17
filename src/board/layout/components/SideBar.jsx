import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { deleteBoard, editBoard } from '../../../store/slices/boardSlice';

export const SideBar = ({ onOpenModal, isOpen }) => {
	const boards = useSelector((state) => state.board.boards);
	const dispatch = useDispatch();

	const [boardId, setBoardId] = useState('');
	const [isEdited, setIsEdited] = useState(false);

	const { register, handleSubmit, setValue } = useForm();

	const handleEdited = (id, title) => {
		setIsEdited((prev) => !prev);
		setBoardId(id);
		setValue('boardEdit', title);
	};

	const onSubmit = (e) => {
		if (e.boardEdit === '') return;

		dispatch(
			editBoard({
				boardId,
				newValue: e.boardEdit,
			})
		);

		setIsEdited(false);
	};

	return (
		<aside
			className={`flex fixed w-[20rem] lg:w-full h-full lg:relative flex-col gap-8 px-6 py-4 bg-[#F0F2F5] transition-all duration-300 z-10 ${
				isOpen
					? 'translate-x-0 opacity-100 visible'
					: 'translate-x-[-60rem] opacity-0 invisible'
			} lg:translate-x-0  lg:opacity-100 lg:visible`}>
			<header className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<img
						className='size-12 rounded-md'
						src='../../../assets/rocket.avif'
						alt='rocket'
					/>
					<div>
						<h2>Teams in space</h2>
						<small className='text-[#A7AFBD]'>Project Manager</small>
					</div>
				</div>

				<button className='size-8 rounded-lg flex items-center justify-center'>
					<i className='bx bx-chevron-up bx-sm'></i>
				</button>
			</header>
			<ul className='flex flex-col items-center gap-2'>
				{boards.length > 0 ? (
					boards.map((board, index) => (
						<li
							className={`w-full p-3 rounded-md hover:bg-[#E6E9EE] cursor-pointer text-[#0747A6] ${
								isEdited ? 'bg-[#E6E9EE]' : ''
							}`}
							key={index}
							id={board.id}
							onDoubleClick={() => handleEdited(board.id, board.title)}>
							{!isEdited || boardId !== board.id ? (
								<Link
									className='w-full group'
									to={`/board/${board.id}`}>
									<div className='flex items-center gap-2 w-full relative'>
										<i className='bx bx-columns bx-sm'></i>
										<span
											className='w-full'
											style={{ maxWidth: '80%', overflowWrap: 'break-word' }}>
											{board.title}
										</span>
										<button
											className='text-red-500 md:opacity-0 md:invisible group-hover:opacity-100 group-hover:visible  transition-opacity duration-300 absolute top-[50%] translate-y-[-50%] right-[-8px]'
											onClick={() => dispatch(deleteBoard(board.id))}>
											<i className='bx bx-trash-alt bx-sm'></i>
										</button>
									</div>
								</Link>
							) : (
								<form onSubmit={handleSubmit(onSubmit)}>
									<input
										type='text'
										{...register('boardEdit')}
										className='w-full bg-transparent outline-none'
										autoFocus
									/>
								</form>
							)}
						</li>
					))
				) : (
					<li className='w-full p-3 font-medium rounded-md text-center bg-red-400 text-white'>
						No boards available
					</li>
				)}
				<li className='w-full'>
					<button
						className='w-full p-3 rounded-md flex items-center gap-2 hover:bg-[#E6E9EE] cursor-pointer justify-center text-[#0747A6]'
						onClick={onOpenModal}>
						<i className='bx bx-plus bx-sm'></i>
						<span>Create a board</span>
					</button>
				</li>
			</ul>
		</aside>
	);
};

SideBar.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onOpenModal: PropTypes.func.isRequired,
};
