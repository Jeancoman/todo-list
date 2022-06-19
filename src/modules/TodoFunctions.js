class Todo {
    constructor(title, dueDate) {
        this.title = title;
        this.dueDate = dueDate;
    }
}

class Projects {
    set project(projectName) {
        this[projectName] = []
    }
}

const projects = new Projects();

function returnProject() {
    return document.querySelector("input[name=name]").value;
}

function returnTask() {
    return document.querySelector("input[name=title]").value;
}

function returnDate() {
    return document.querySelector("input[type=date]").value;
}

function taskOnProject(projectName, task) {
    projects[projectName].push(task);
}

function getProject() {
    const title = document.querySelector("h2");
    return title.textContent;
}

function setDateOnTask(date, task) {

}

export {returnProject, getProject, returnTask, returnDate, taskOnProject, projects, Todo}
