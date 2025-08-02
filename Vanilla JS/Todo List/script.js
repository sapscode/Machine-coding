document.addEventListener("DOMContentLoaded", function () {
	const todoForm = document.querySelector(".todo-form");
	const todoInput = document.querySelector(".todo-input");
	const todoList = document.querySelector(".todo-list");

	todoForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const todoText = todoInput.value.trim();
		if (todoText !== "") {
			createNewTask(todoText);
			todoInput.value = "";
		} else {
			alert("Please enter valid task");
		}
	});

	todoList.addEventListener("click", function (e) {
		const target = e.target;
		if (target.tagName === "BUTTON") {
			const todoItem = target.parentElement;
			const action = target.dataset.action;
			if (action === "delete") {
				todoItem.remove();
			} else if (action === "edit") {
				const currentTaskName = todoItem.querySelector("span");

				const editInput = document.createElement("input");
				editInput.required = true;
				editInput.value = currentTaskName.innerText;
				editInput.style.width = "120px";

				target.disabled = true;
				currentTaskName.replaceWith(editInput);

				const save = () => {
					if (editInput.value.trim() === "") {
						alert("Task cannot be empty.");
						editInput.focus();
						return;
					}
					currentTaskName.textContent = editInput.value;
					editInput.replaceWith(currentTaskName);
					target.disabled = false;
				};

				editInput.focus();
				editInput.addEventListener("blur", save);
				editInput.addEventListener("keydown", (e) => {
					if (e.key === "Enter") save();
				});
			}
		}
	});

	const createNewTask = (todoText) => {
		const todoItem = document.createElement("li");
		const editButton = document.createElement("button");
		const removeButton = document.createElement("button");

		todoItem.innerHTML = `<span>${todoText}</span>`;
		editButton.innerText = `✏️`;
		editButton.setAttribute("data-action", "edit");
		removeButton.innerText = `❌`;
		removeButton.setAttribute("data-action", "delete");

		todoItem.appendChild(editButton);
		todoItem.appendChild(removeButton);
		todoList.appendChild(todoItem);
	};
});
