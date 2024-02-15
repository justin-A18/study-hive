import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_STATE = {
	boards: [],
};

const initialState = (() => {
	const persistenceState = localStorage.getItem('__redux__state__');

	if (persistenceState) {
		return {
			boards: JSON.parse(persistenceState).board.boards,
		};
	}

	return DEFAULT_STATE;
})();

export const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {
		addNewBoard: (state, action) => {
			state.boards = [...state.boards, action.payload];
		},
		editBoard: (state, action) => {
			state.boards = state.boards.map((board) => {
				if (board.id === action.payload.boardId) {
					return {
						...board,
						title: action.payload.newValue,
					};
				}

				return board;
			});
		},
		deleteBoard: (state, action) => {
			state.boards = state.boards.filter((board) => board.id != action.payload);
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

export const { addNewBoard, addNewCard, addNewList, editBoard, deleteBoard } =
	boardSlice.actions;
