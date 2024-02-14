import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { HeaderBoard, CreateCard, CardItem } from './components';

export const BoardPage = () => {
	const { id } = useParams();
	const [isOpenModal, setIsOpenModal] = useState(false);

	const boards = useSelector((state) => state.board.boards);
	const board = boards.find((item) => item.id === id);

	if (!board) return <Navigate to='/' />;

	const handleOpenMenu = () => {
		setIsOpenModal((prev) => !prev);
	};

	return (
		<div className='p-4 flex flex-col gap-4 w-full h-full whitespace-nowrap overflow-x-auto container-slides relative'>
			<HeaderBoard
				title={board.title}
				onOpenModal={handleOpenMenu}
			/>
			<div className='inline-flex gap-2 mt-32'>
				{board.cards.length > 0 ? (
					board.cards.map((card) => (
						<CardItem
							key={card.id}
							card={card}
							boardId={id}
						/>
					))
				) : (
					<div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-2 text-[#0747A6] font-medium uppercase items-center'>
						<h2 className='text-2xl'>Add a card to get started</h2>
						<p className='text-xl'>click the + button</p>
					</div>
				)}
			</div>

			<CreateCard
				id={id}
				isOpen={isOpenModal}
				onOpenModal={handleOpenMenu}
			/>
		</div>
	);
};
