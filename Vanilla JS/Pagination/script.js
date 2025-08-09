document.addEventListener("DOMContentLoaded", function () {
	let totalPages = 0;
	const limit = 10;
	let products = [];
	let page = 1;

	const URL = "https://dummyjson.com/products?";
	async function fetchProducts(page) {
		const cachedProductsList = localStorage.getItem(`page-${page}`);
		if (cachedProductsList && cachedProductsList.length) {
			try {
				products = JSON.parse(cachedProductsList);
				render();
				return;
			} catch (err) {
				console.error("Failed retrieving from cache, refetching ...");
				localStorage.removeItem(`page-${page}`);
				fetchProducts(page);
				return;
			}
		} else {
			try {
				const res = await fetch(
					`${URL}limit=${limit}&skip=${(page - 1) * limit}`
				);
				const data = await res.json();
				if (data && data.products) {
					products = data.products;
					localStorage.setItem(`page-${page}`, JSON.stringify(products));
					if (totalPages === 0) {
						totalPages = Math.ceil(data.total / limit);
						renderPagination(totalPages);
					}
					render();
				}
			} catch (err) {
				console.log(err);
			}
		}
	}

	fetchProducts(page);

	function renderPagination(totalPages) {
		const buttonsContainer = document.querySelector(".buttons-container");

		const prevButton = document.createElement("button");
		prevButton.classList.add("btn", "previous");
		prevButton.textContent = "<<";
		buttonsContainer.append(prevButton);

		for (let i = 0; i < totalPages; i++) {
			const pageButton = document.createElement("button");
			pageButton.classList.add("btn");
			pageButton.textContent = i + 1;
			if (i === 0) pageButton.classList.add("selected");
			buttonsContainer.append(pageButton);
		}

		const nextButton = document.createElement("button");
		nextButton.classList.add("btn", "next");
		nextButton.textContent = ">>";
		buttonsContainer.append(nextButton);

		buttonsContainer.addEventListener("click", function (e) {
			const target = e.target;
			if (target.tagName === "BUTTON") {
				if (target.classList.contains("selected")) return;
				if (target.classList.contains("previous")) {
					page = page === 1 ? totalPages : page - 1;
				} else if (target.classList.contains("next")) {
					page = (page % totalPages) + 1;
				} else {
					page = parseInt(e.target.textContent);
				}
				Array.from(buttonsContainer.children).forEach((button) => {
					button.classList.toggle(
						"selected",
						parseInt(button.textContent) === page
					);
				});
				fetchProducts(page);
			}
		});
	}

	function render() {
		const container = document.querySelector(".container");
		container.innerHTML = "";

		products.forEach((product) => {
			const { title, thumbnail } = product;
			const productContainer = document.createElement("div");
			productContainer.classList.add("product-container");

			const image = document.createElement("img");
			image.src = thumbnail;

			const name = document.createElement("h4");
			name.textContent = title;

			productContainer.append(image, name);
			container.append(productContainer);
		});
	}
});
