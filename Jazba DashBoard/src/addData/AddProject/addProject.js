import getProjects from "../../getData/getProjectData/getProjectData.js";
import createToast from "../../utils/notifications/notification.js";
import { responseHandler } from "../../utils/responseHandler/responseHandler.js";

async function submitForm(projectName, projectDescription, projectImage, projectType) {

    const formData = {
        projectType: projectType,
        projectImage: projectImage,
        projectName: projectName,
        projectDescription: projectDescription,
    };
    try {
        const response = await fetch('http://localhost:3000/api/projects/', {
            method: 'POST',
            body: createFormData(formData),
        });

        const data = await response.json();
        responseHandler(data);
        
        getProjects()
    } catch (error) {
        console.error('Error:', error);
        createToast('error', "Error Addind Project")
    }
}
function createFormData(object) {
    const formData = new FormData();

    for (const key in object) {
        formData.append(key, object[key]);
    }

    return formData;
}

export default submitForm
