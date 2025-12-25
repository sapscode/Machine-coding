import { useState } from "react";
import Tabs from "./Components/Tabs";
import TabsContent from "./Components/TabsContent";

function App() {
	// Single source of truth for which tab is active
	// This state is lifted up because BOTH Tabs and TabsContent need it
	const [activeTab, setActiveTab] = useState(0);

	return (
		<>
			{/* 
        Tabs only displays UI and notifies when a tab is clicked.
        It does NOT own the state.
      */}
			<Tabs activeTab={activeTab} onTabChange={setActiveTab} />

			{/* 
        TabsContent reads the same state to decide what to show.
        This keeps UI in sync.
      */}
			<TabsContent activeTab={activeTab} />
		</>
	);
}

export default App;
