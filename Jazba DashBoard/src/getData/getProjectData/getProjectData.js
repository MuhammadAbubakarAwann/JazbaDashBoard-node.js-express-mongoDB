import addProjectsToTable from '../dataToTable/projects_To_Table.js'
import { projectsReloader } from "../../utils/reloaders/projectsReloader.js";
import projectCounter from '../../utils/counter/projectCounter.js';
import { responseHandler } from '../../utils/responseHandler/responseHandler.js';

function getProjects() {
    projectsReloader()
    fetch("http://localhost:3000/api/projects/")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.data.forEach(project => {
                addProjectsToTable(project.projectName, project.projectDescription, project.projectImage, project.projectType, project._id)
            });
            projectCounter()
            if(!data.success) {
                responseHandler(data)
            }

        })
        .catch(error => {
            console.log("Error retrieving data:", error);
        });
}


export default getProjects;
