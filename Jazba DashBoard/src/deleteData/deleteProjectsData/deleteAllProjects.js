import createToast from "../../utils/notifications/notification.js";
import getProjects from '../../getData/getProjectData/getProjectData.js';


function deleteAllProjects() {
    const project_Table = document.getElementById('project_Table').getElementsByTagName('tbody')[0];
    fetch("http://localhost:3000/api/projects/", {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.success, data.message, data.data);
        createToast('success', data.message); 
        getProjects()
        project_Table.textContent = "";
    })
    .catch(error => {
        console.error('Error deleting projects:', error);
        createToast('error', 'Error occurred while deleting projects'); // Display generic error notification
    });
}

export default deleteAllProjects;
