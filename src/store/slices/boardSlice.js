import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	boards: [],
};

export const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		addNewBoard: (state, action) => {
			state.boards = [...state.boards, action.payload];
		},
		addNewCard: (state, action) => {
			state.boards = state.boards.map((board) => {
				if (board.id === action.payload.boardId) {
					return {
						...board,
						cards: [...board.cards, action.payload.boardCard],
					};
				}
				return board;
			});
		},
		addNewList: (state, action) => {
			state.boards = state.boards.map((board) => {
				if (board.id === action.payload.boardId) {
					return {
						...board,
						cards: board.cards.map((card) => {
							if (card.id === action.payload.cardId) {
								return {
									...card,
									list: [...card.list, action.payload.cardList],
								};
							}
							return card;
						}),
					};
				}
				return board;
			});
		},
	},
});

export const { addNewBoard, addNewCard, addNewList } = boardSlice.actions;
