import { useState } from "react";
import "./App.css";
import Square from "./components/Square";

function App() {
	const [boxes, setBoxes] = useState<string[]>(new Array(9).fill(null));
	const [xTurn, setXturn] = useState<boolean>(true);

	const handleClick = (i: number) => {
		if (boxes[i] || winner) return;

		setBoxes((prev) => {
			const newBoxes = [...prev];
			newBoxes[i] = xTurn ? "X" : "O";
			return newBoxes;
		});

		setXturn(!xTurn);
	};

	const resetBoard = () => {
		setBoxes(new Array(9).fill(null));
	};

	const checkWinner = () => {
		const winningPatterns = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];

		for (let line of winningPatterns) {
			const [a, b, c] = line;

			if (boxes[a] && boxes[a] === boxes[b] && boxes[b] === boxes[c]) {
				return boxes[a];
			}
		}

		return null;
	};

	const winner = checkWinner();

	return (
		<div className="container">
			<div className="headings">
				<span className="turn">
					{winner
						? `User ${winner} wins!!`
						: `Next Turn : ${xTurn ? "X" : "O"}`}
				</span>
				<button className="btn" onClick={resetBoard}>
					Reset
				</button>
			</div>
			<div className="board">
				<div className="row">
					<Square value={boxes[0]} handleClick={() => handleClick(0)} />
					<Square value={boxes[1]} handleClick={() => handleClick(1)} />
					<Square value={boxes[2]} handleClick={() => handleClick(2)} />
				</div>
				<div className="row">
					<Square value={boxes[3]} handleClick={() => handleClick(3)} />
					<Square value={boxes[4]} handleClick={() => handleClick(4)} />
					<Square value={boxes[5]} handleClick={() => handleClick(5)} />
				</div>
				<div className="row">
					<Square value={boxes[6]} handleClick={() => handleClick(6)} />
					<Square value={boxes[7]} handleClick={() => handleClick(7)} />
					<Square value={boxes[8]} handleClick={() => handleClick(8)} />
				</div>
			</div>
		</div>
	);
}

export default App;
