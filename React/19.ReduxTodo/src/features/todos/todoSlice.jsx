import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
	"fetchTodos",
	async (_, { rejectWithValue }) => {
		try {
			const res = await fetch(
				"https://jsonplaceholder.typicode.com/todos?_limit=10"
			);
			if (!res.ok) {
				throw new Error("Server Error");
			}
			const data = await res.json();
			return data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);

export const todoSlice = createSlice({
	name: "todos",
	initialState: {
		todos: [],
		status: "idle",
		error: null,
		filter: "all"
	},
	reducers: {
		addTodo: (state, action) => {
			state.todos.push(action.payload);
		},
		removeTodo: (state, action) => {
			state.todos = state.todos.filter((todo) => todo.id !== action.payload);
		},
		updateTodo: (state, action) => {
			state.todos = state.todos.map((todo) => {
				if (todo.id === action.payload.id) {
					return {
						...todo,
						completed: action.payload.completed
					};
				}
				return todo;
			});
		},
		updateFilter: (state, action) => {
			state.filter = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchTodos.pending, (state) => {
			state.status = "pending";
		});
		builder.addCase(fetchTodos.fulfilled, (state, action) => {
			state.todos.push(
				...action.payload.map((task) => {
					return { id: `${task.id}-${Date.now()}`, name: task.title };
				})
			);
			state.status = "fulfilled";
		});
		builder.addCase(fetchTodos.rejected, (state, action) => {
			state.status = "error";
			state.err = action.payload;
		});
	}
});

export const { addTodo, removeTodo, updateTodo, updateFilter } =
	todoSlice.actions;
export default todoSlice.reducer;

