function projectCounter() {

    const project_Table = document.getElementById('project_Table').getElementsByTagName('tbody')[0];
    const numberOfProjects = project_Table.rows.length;

    const projectCounterDiv = document.getElementById("projectsCounter")
    projectCounterDiv.textContent = "( " + numberOfProjects + " )"

}
export default projectCounter
