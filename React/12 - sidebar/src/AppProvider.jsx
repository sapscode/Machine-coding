import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const AppProvider = ({ children }) => {
	const [showModal, setShowModal] = useState(false);
	const [showSidebar, setShowSidebar] = useState(false);
	return (
		<GlobalContext.Provider
			value={{ showModal, setShowModal, showSidebar, setShowSidebar }}
		>
			{children}
		</GlobalContext.Provider>
	);
};
export default AppProvider;
