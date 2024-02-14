import PropTypes from 'prop-types';
import { useState } from 'react';
import { CreateList } from './CreateList';
import { useSelector } from 'react-redux';
import { getInitial } from '../../helpers/getInitial';

export const CardItem = ({ card, boardId }) => {
	const [isOpenList, setIsOpenList] = useState(false);
	const { user } = useSelector((state) => state.auth);

	const handleOpenList = () => {
		setIsOpenList((prev) => !prev);
	};

	return (
		<>
			<article className='flex-[0_0_auto] w-[18rem] bg-[#F4F5F7] min-h-32 p-3 flex flex-col gap-6'>
				<h3 className='uppercase text-[#8B95A6] font-bold px-3'>
					{card.title}
				</h3>
				<ul className='flex flex-col items-center gap-2 w-full'>
					{card.list.map((list, index) => (
						<li
							key={index}
							id={list.id}
							className='bg-white w-full p-2 min-h-20 flex flex-col gap-2'>
							<p>{list.title}</p>
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
		</>
	);
};

CardItem.propTypes = {
	card: PropTypes.object.isRequired,
	boardId: PropTypes.string.isRequired,
};
