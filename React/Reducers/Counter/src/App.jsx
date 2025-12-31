import { useReducer } from "react";
import "./App.css";
import { initialState, reducer } from "./Reducers/CounterReducer";

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<>
			<div>Count is {state.count}</div>
			<button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
			<button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
			<button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
		</>
	);
}

export default App;
