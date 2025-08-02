document.addEventListener("DOMContentLoaded", function () {
	const tabsContainer = document.querySelector("#tabsContainer");
	const tabContentContainer = document.querySelector("#tabContentContainer");

	const addTabButton = document.querySelector('[data-tab="add-tab"]');

	let tabNumber = 0;

	addTabButton.addEventListener("click", () => {
		const tabNo = ++tabNumber;
		createTab(tabNo);
		createContent(tabNo);
	});

	tabsContainer.addEventListener("click", (e) => {
		const target = e.target;
		if (target.tagName === "BUTTON") {
			const targetTab = target.dataset.tab;
			if (targetTab !== "add-tab") {
				hideContent();
				const targetContent = tabContentContainer.querySelector(
					`[data-tab="${targetTab}"]`
				);
				if (targetContent) targetContent.hidden = false;
			}
		}
	});

	function createTab(tabNo) {
		const newTab = document.createElement("button");
		newTab.classList.add("tab");
		newTab.dataset.tab = `tab-${tabNo}`;
		newTab.textContent = `New Tab ${tabNo}`;
		newTab.setAttribute("tabindex", 0);
		tabsContainer.insertBefore(newTab, addTabButton);
		newTab.focus();
	}

	function createContent(tabNo) {
		const newContent = document.createElement("article");
		newContent.classList.add("content");
		newContent.dataset.tab = `tab-${tabNo}`;
		newContent.textContent = `tab-${tabNo}, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur eius iure deserunt iusto, hic esse eveniet ducimus beatae laborum fugit iste ipsum ea accusantium cupiditate. Voluptatum at ipsum distinctio cum.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur eius iure deserunt iusto, hic esse eveniet ducimus beatae laborum fugit iste ipsum ea accusantium cupiditate. Voluptatum at ipsum distinctio cum.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur eius iure deserunt iusto, hic esse eveniet ducimus beatae laborum fugit iste ipsum ea accusantium cupiditate. Voluptatum at ipsum distinctio cum.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur eius iure deserunt iusto, hic esse eveniet ducimus beatae laborum fugit iste ipsum ea accusantium cupiditate. Voluptatum at ipsum distinctio cum.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur eius iure deserunt iusto, hic esse eveniet ducimus beatae laborum fugit iste ipsum ea accusantium cupiditate. Voluptatum at ipsum distinctio cum.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur eius iure deserunt iusto, hic esse eveniet ducimus beatae laborum fugit iste ipsum ea accusantium cupiditate. Voluptatum at ipsum distinctio cum.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur eius iure deserunt iusto, hic esse eveniet ducimus beatae laborum fugit iste ipsum ea accusantium cupiditate. Voluptatum at ipsum distinctio cum.`;
		tabContentContainer.append(newContent);
		hideContent();
		newContent.hidden = false;
	}

	function hideContent() {
		Array.from(tabContentContainer.children).forEach(
			(child) => (child.hidden = true)
		);
	}
});
