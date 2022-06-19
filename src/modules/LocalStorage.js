function populateStorage(project){
    localStorage.setItem("projects", JSON.stringify(project));
}

function retrieveStorage() {
    return localStorage.getItem('projects');
}

export {populateStorage, retrieveStorage }