import createToast from "../../utils/notifications/notification.js";

import getProjects from '../../getData/getProjectData/getProjectData.js';

function deleteSingleProject(deleteProject_id) {

    fetch(`http://localhost:3000/api/projects/${deleteProject_id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!data.success) {
                console.log(data.message);
                return;
            }
            console.log(data.success, data.message);
            getProjects()
            createToast('success', data.message);


        })
        .catch(error => {
            console.log("Error Deleting  project:", error);
            createToast('error', error);
        });


} export default deleteSingleProject