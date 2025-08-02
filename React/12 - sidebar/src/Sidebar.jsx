import logo from "./logo.svg";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "./AppProvider";
import { links, social } from "./data";

const Sidebar = () => {
	const { showSidebar, setShowSidebar } = useGlobalContext();
	return (
		<aside className={showSidebar ? "sidebar show-sidebar" : "sidebar"}>
			<div className="sidebar-header">
				<img src={logo} className="logo" />
				<button
					className="close-btn"
					onClick={() => setShowSidebar(!showSidebar)}
				>
					<FaTimes />
				</button>
			</div>
			<ul className="links">
				{links.map((link) => {
					const { id, url, text, icon } = link;
					return (
						<li key={id}>
							<a href={url}>
								{icon}
								{text}
							</a>
						</li>
					);
				})}
			</ul>
			<ul className="social-links">
				{social.map((soc) => {
					const { id, url, icon } = soc;
					return (
						<li key={id}>
							<a href={url}>{icon}</a>
						</li>
					);
				})}
			</ul>
		</aside>
	);
};
export default Sidebar;
