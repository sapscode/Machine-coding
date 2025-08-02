import {
	CLEAR_CART,
	REMOVE,
	INCREASE,
	DECREASE,
	LOADING,
	DISPLAY_ITEMS
} from "./actions";

export const reducer = function (state, action) {
	const updatedCart = new Map(state.cart);
	switch (action.type) {
		case CLEAR_CART:
			return { ...state, cart: new Map() };

		case REMOVE:
			updatedCart.delete(action.payload.id);
			return { ...state, cart: updatedCart };

		case INCREASE: {
			const item = updatedCart.get(action.payload.id);
			const newItem = { ...item, amount: item.amount + 1 };
			updatedCart.set(action.payload.id, newItem);
			return { ...state, cart: updatedCart };
		}

		case DECREASE: {
			const item = updatedCart.get(action.payload.id);

			if (item.amount === 1) updatedCart.delete(action.payload.id);
			else {
				const newItem = { ...item, amount: item.amount - 1 };
				updatedCart.set(action.payload.id, newItem);
			}
			return { ...state, cart: updatedCart };
		}

		case LOADING:
			return { ...state, loading: true };

		case DISPLAY_ITEMS:
			return {
				...state,
				loading: false,
				cart: new Map(action.payload.cart.map((item) => [item.id, item]))
			};

		default:
			return state;
	}
};
