import { projects, isEmpty } from "./todoFunctions";

function projectOnSideBar(projectName) {
    const button = document.querySelector("#add-project");
    const img = document.createElement("img");
    const container = document.createElement("div");
    const div = document.createElement("div");
    const deleteBtn = document.createElement("div");

    container.setAttribute("class", "icon");
    div.setAttribute("class", "text");
    div.classList.add("project-text");
    img.setAttribute("src", "./img/format_list.svg");
    img.setAttribute("class", "project-color");
    deleteBtn.classList.add("delete");
    deleteBtn.classList.add("display-none");

    div.textContent = projectName;
    deleteBtn.textContent = "x";
    container.dataset.project = projectName;

    container.appendChild(img);
    img.insertAdjacentElement("afterend", div);
    div.insertAdjacentElement("afterend", deleteBtn);
    button.insertAdjacentElement("beforebegin", container);
}

function taskOnMain(taskName, projectName, index, dueDate) {
    const button = document.querySelector("#add-task");
    const img = document.createElement("img");
    const container = document.createElement("div");
    const text = document.createElement("div");
    const date = document.createElement("div");
    const input = document.createElement("input");
    const hr = document.createElement("hr");
    const deleteBtn = document.createElement("div");

    container.setAttribute("class", "todo");
    text.setAttribute("class", "task-text");
    date.setAttribute("class", "date");
    img.setAttribute("src", "./img/radio_button_unchecked.svg");
    img.setAttribute("class", "todo-icon");
    input.setAttribute("type", "date");
    input.setAttribute("class", "due-date");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("delete-task");


    text.textContent = taskName;
    container.dataset.belongs = projectName;
    container.dataset.index = index;
    input.value = dueDate;

    container.appendChild(img);
    img.insertAdjacentElement("afterend", text);
    text.insertAdjacentElement("afterend", date);
    date.insertAdjacentElement("afterend", deleteBtn)
    date.appendChild(input)
    button.insertAdjacentElement("beforebegin", container);
    container.insertAdjacentElement("beforeend", hr)

}
function projectTab(projectName) {
        const title = document.querySelector("h2");
        title.textContent = projectName;
}

function toggleAddProject() {
    const projectBtn = document.querySelector("#add-project");
    const form = document.querySelector(".input");
    projectBtn.classList.toggle("toggled");
    form.classList.toggle("toggled"); 
}

function toggleAddTask() {
    const taskBtn = document.querySelector("#add-task");
    const form = document.querySelector("#task-container");
    taskBtn.classList.toggle("toggled");
    form.classList.toggle("toggled");
}


export { projectOnSideBar, toggleAddProject, projectTab, taskOnMain, toggleAddTask }