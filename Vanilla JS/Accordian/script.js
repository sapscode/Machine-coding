const sections = [
	{
		title: "Section 1",
		content: "Content for section 1"
	},
	{
		title: "Section 2",
		content: "Content for section 2"
	},
	{
		title: "Section 3",
		content: "Content for section 3"
	}
	// Add more sections as needed
];

document.addEventListener("DOMContentLoaded", function () {
	const container = document.querySelector(".accordian-container");
	sections.forEach((section) => {
		const accordianSection = document.createElement("div");
		accordianSection.classList.add("section");

		const accordianHeader = document.createElement("div");
		accordianHeader.classList.add("header");
		accordianHeader.innerText = section.title;

		const accordianContent = document.createElement("p");
		accordianContent.classList.add("content");
		accordianContent.hidden = true;
		accordianContent.textContent = section.content;

		accordianSection.append(accordianHeader, accordianContent);
		container.append(accordianSection);
	});

	container.addEventListener("click", (e) => {
		const target = e.target;
		if (target.classList.contains("header")) {
			const content = target.nextElementSibling;
			if (target.classList.contains("active")) {
				target.classList.remove("active");
				content.hidden = true;
			} else {
				hideAll();
				target.classList.add("active");
				content.hidden = false;
			}
		}
	});

	function hideAll() {
		const allContents = document.querySelectorAll(".content");
		const allHeaders = document.querySelectorAll(".header");
		allContents.forEach((content) => (content.hidden = true));
		allHeaders.forEach((header) => header.classList.remove("active"));
	}
});
