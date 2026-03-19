export const initialState = {
	sortBy: null,
	isAscending: true,
	currentPage: 1
};

export function reducer(state, action) {
	switch (action.type) {
		case "SORT_COLUMN": {
			// Same column → toggle order
			if (state.sortBy === action.payload) {
				return {
					...state,
					isAscending: !state.isAscending,
					currentPage: 1
				};
			}

			// New column → reset order + page
			return {
				...state,
				sortBy: action.payload,
				isAscending: true,
				currentPage: 1
			};
		}

		case "SET_PAGE":
			return {
				...state,
				currentPage: action.payload
			};

		default:
			return state;
	}
}
