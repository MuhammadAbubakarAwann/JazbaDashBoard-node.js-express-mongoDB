import getProjects from "../../getData/getProjectData/getProjectData.js";
import createToast from "../../utils/notifications/notification.js";

function updateProject(id, projectName, projectDescription, projectImage, projectType) {
    const updatedProject = {
        projectName,
        projectDescription,
        projectImage,
        projectType,
    };
    const jsonData = JSON.stringify(updatedProject);

    fetch(`http://localhost:3000/api/projects/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
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
                createToast('warning', data.message)
                return;
            }
            console.log(data.success, data.message, data.data);
            createToast('success', data.message)
            getProjects()

        })
        .catch(error => {
            console.log("Error Updating Project:", error);
            createToast('error', error)
        });
}

export default updateProject;