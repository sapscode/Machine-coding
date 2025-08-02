import { FaBars } from "react-icons/fa";
import { links, social } from "./data";
import logo from "./logo.svg";
import { useRef, useState } from "react";
const App = () => {
	const [showLinks, setShowLinks] = useState(true);
	const linkContainerRef = useRef(null);
	const linksRef = useRef(null);

	const linkStyle = {
		height: showLinks
			? `${linksRef?.current?.getBoundingClientRect().height}px`
			: "0px"
	};
	return (
		<nav>
			<div className="nav-center">
				<div className="nav-header">
					<img src={logo} alt="" className="logo" />
					<button
						className="nav-toggle"
						onClick={() => setShowLinks(!showLinks)}
					>
						<FaBars />
					</button>
				</div>
				<div
					className="links-container"
					ref={linkContainerRef}
					style={linkStyle}
				>
					<ul className="links" ref={linksRef}>
						{links.map((link) => {
							return (
								<li key={link.id} className="">
									<a href={link.url}>{link.text}</a>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</nav>
	);
};
export default App;
