import {
  projectOnSideBar,
  toggleAddProject,
  projectTab,
  taskOnMain,
  toggleAddTask,
} from "./modules/UIFunctions";
import {
  returnProject,
  projects,
  getProject,
  taskOnProject,
  returnTask,
  Todo,
  returnDate,
} from "./modules/TodoFunctions";
import { retrieveStorage, populateStorage } from "./modules/LocalStorage";
import { isToday, parseISO, isFuture } from "date-fns";

window.onload = () => {
  const projectList = JSON.parse(retrieveStorage());
  for (let key in projectList) projects[key] = projectList[key];
  const names = Object.keys(projectList);
  for (let i = 0; i < names.length; i++) {
    const name = names[i]
    if(name == "Inbox" || name == "Today" || name == "Upcoming") {

    } else projectOnSideBar(name)
  }
  const icon = document.querySelector(".icon");
  icon.classList.add("active");
  const inbox = projects["Inbox"];
  for (let i = 0; i < inbox.length; i++) {
    const title = projects["Inbox"][i]["title"];
    const date = projects["Inbox"][i]["dueDate"];
    taskOnMain(title, "Inbox", i, date)
  }

};

const projectBtn = document.querySelector("#add-project");
const subBtn = document.querySelector("#submit-btn");
const resetBtn = document.querySelector("#reset-btn");
const projectForm = document.querySelector("#project-form");
const taskForm = document.querySelector("#task-form");
const taskBtn = document.querySelector("#add-task");
const taskResetBtn = document.querySelector("#task-reset-btn");
const taskSubBtn = document.querySelector("#task-submit-btn");

projects.project = "Inbox";
projects.project = "Today";
projects.project = "Upcoming";

projectBtn.addEventListener("click", toggleAddProject);
subBtn.addEventListener("click", toggleAddProject);
resetBtn.addEventListener("click", toggleAddProject);

taskBtn.addEventListener("click", toggleAddTask);
taskSubBtn.addEventListener("click", toggleAddTask);
taskResetBtn.addEventListener("click", toggleAddTask);

window.addEventListener("click", (event) => {
  const clicked = event.target;
  const mainTitle = document.querySelector("h3");

  if ("project" in clicked.dataset) {
    const name = clicked.dataset.project;
    name == mainTitle
      ? null
      : document
          .querySelectorAll(".icon")
          .forEach((element) => element.classList.remove("active"));
    clicked.classList.toggle("active");
    projectTab(name);
    if (name == "Today" || name == "Upcoming") {
      const taskBtn = document.querySelector("#add-task");
      taskBtn.classList.add("toggled");
    } else taskBtn.classList.remove("toggled");
  }
  if (clicked.classList.contains("icon")) {
    const tasks = document.querySelectorAll(".todo");
    tasks.forEach((task) => {
      task.remove();
    });
  }
});

window.addEventListener("click", (event) => {
  const button = event.target;
  if ("project" in button.dataset) {
    const projectName = button.dataset.project;
    const project = projects[projectName];
    for (let index = 0; index < project.length; index++) {
      const element = projects[projectName][index]["title"];
      const date = projects[projectName][index]["dueDate"];
      taskOnMain(element, projectName, index, date);
    }
    console.log(projects);
  }
});

window.addEventListener("click", (event) => {
  if (event.target.classList.contains("due-date")) {
    const input = document.querySelectorAll("input[type=date]");
    input.forEach((element) => {
      element.onchange = (e) => {
        const input = e.target;
        const inputContainer = input.parentElement;
        const container = inputContainer.parentElement;
        const project = container.dataset.belongs;
        const index = container.dataset.index;
        const taskText = container.querySelector(".task-text");
        const taskTitle = taskText.textContent;
        const dateISO = parseISO(e.target.value);
        const date = e.target.value;
        projects[project][index]["dueDate"] = date;
        const task = new Todo(taskTitle, date);
        if (isToday(dateISO)) {
          taskOnProject("Today", task);
          console.log(projects);
        } else if (isFuture(dateISO)) {
          taskOnProject("Upcoming", task);
          console.log(projects);
        }
        populateStorage(projects);
        console.log(retrieveStorage());
      };
    });
  }
});

window.addEventListener("mouseover", (e) => {
  if(e.target.children[2] != null && e.target.classList.contains("icon")){
    const deletBtn = e.target.querySelector(".delete");
    deletBtn.classList.remove("display-none")
  }

})

window.addEventListener("mouseout", (e) => {
  if(e.target.children[2] != null && !e.target.classList.contains("active") && e.target.classList.contains("icon")){
    const deletBtn = e.target.querySelector(".delete");
    deletBtn.classList.add("display-none")
  }
})

window.addEventListener("click", (e) => {
  const event = e.target;
  if(event.children[2] != null && event.classList.contains("icon")) {
    document.querySelectorAll(".delete").forEach((element) => {
      element.classList.add("display-none")
    })
    const deletBtn = e.target.querySelector(".delete");
    deletBtn.classList.remove("display-none")

  } else if(event.classList.contains("icon")){
    document.querySelectorAll(".delete").forEach((element) => {
      element.classList.add("display-none")
    })
  }
})

window.addEventListener("click", (e) => {
  const event = e.target;
  if(event.classList.contains("delete")){
    const project = event.parentElement.dataset.project;
    delete projects[project];
    event.parentElement.remove();
    const taskBtn = document.querySelector("#add-task");
    taskBtn.classList.add("toggled");
    const h2 = document.querySelector("h2");
    h2.textContent = "";
    populateStorage(projects)
  }
})

window.addEventListener("click", (e) => {
  const event = e.target;
  if(event.classList.contains("delete-task")){
    const index = event.parentElement.dataset.index;
    const project = event.parentElement.dataset.belongs;
    projects[project].splice(index, 1);
    event.parentElement.remove()
    console.log(projects);
    populateStorage(projects);
  }
})

projectForm.onsubmit = (event) => {
  event.preventDefault();
  const name = returnProject();
  const icons = document.querySelectorAll(".text");
  projects.project = name;
  const projectNames = Object.keys(projects);
  for (let index = 0; index < icons.length; index++) {
    const text = icons[index];
    const htmlName = text.textContent;
    const name = projectNames[index];
    if (htmlName == name) {
    } else projectOnSideBar(name);
    console.log(text);
  }
  console.log(projects);
  populateStorage(projects);
  console.log(retrieveStorage());
  projectForm.reset();
};

taskForm.onsubmit = (event) => {
  event.preventDefault();
  const taskName = returnTask();
  const task = new Todo(taskName);
  const inProject = getProject();
  taskOnProject(inProject, task);
  const titles = document.querySelectorAll(".task-text");
  const project = projects[inProject];
  for (let index = 0; index < project.length; index++) {
    const titleIndex = projects[inProject][index]["title"];
    const text = titles[index];
    const title = text.textContent;
    if (titleIndex == title) {
    } else taskOnMain(taskName, inProject, index);
  }
  populateStorage(projects);
  console.log(retrieveStorage());
  console.log(projects);
  taskForm.reset();
};
