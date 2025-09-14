import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./AppProvider";
const Home = () => {
	const { showModal, setShowModal, showSidebar, setShowSidebar } =
		useGlobalContext();
	// console.log("showSidebar", showSidebar);
	return (
		<div>
			{!showSidebar && (
				<button
					className="sidebar-toggle"
					onClick={() => setShowSidebar(!showSidebar)}
				>
					<FaBars />
				</button>
			)}

			<button
				className="btn"
				onClick={() => {
					setShowSidebar(false);
					setShowModal(!showModal);
				}}
			>
				Show Modal
			</button>
		</div>
	);
};
export default Home;
