import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./AppReducer";
import {
	CLEAR_CART,
	REMOVE,
	INCREASE,
	DECREASE,
	LOADING,
	DISPLAY_ITEMS
} from "./actions";
import { getTotals } from "./util";

const url = "https://www.course-api.com/react-useReducer-cart-project";

const GlobalContext = createContext();
export const useAppContext = () => useContext(GlobalContext);

const initialState = {
	loading: false,
	cart: new Map()
};

const AppContext = ({ children }) => {
	const [state, despatch] = useReducer(reducer, initialState);
	const { totalAmount, totalCost } = getTotals(state.cart);

	const clearCart = () => despatch({ type: CLEAR_CART });
	const remove = (id) => despatch({ type: REMOVE, payload: { id } });
	const increase = (id) => despatch({ type: INCREASE, payload: { id } });
	const decrease = (id) => despatch({ type: DECREASE, payload: { id } });
	const fetchData = async () => {
		despatch({ type: LOADING });
		try {
			const res = await fetch(url);
			const data = await res.json();
			despatch({ type: DISPLAY_ITEMS, payload: { cart: data } });
		} catch (err) {
			throw new Error(err);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				...state,
				clearCart,
				remove,
				increase,
				decrease,
				totalAmount,
				totalCost
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
export default AppContext;
