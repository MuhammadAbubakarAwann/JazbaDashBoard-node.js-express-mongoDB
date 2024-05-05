import getEmployees from "../../getData/getEmployeeData/getEmployeeData.js";
import createToast from "../../utils/notifications/notification.js";
import displayEmployeeImage from "../../getData/displayEmployeeImage.js";
import { responseHandler } from "../../utils/responseHandler/responseHandler.js";

async function submitForm(employee_name, employee_designation, employee_phone, employee_bio, employee_teamType, employee_image) {

    const formData = {
        employee_teamType: employee_teamType,
        employee_image: employee_image,
        employee_name: employee_name,
        employee_phone: employee_phone,
        employee_designation: employee_designation,
        employee_bio: employee_bio,
    };

    try {
        const response = await fetch('http://localhost:3000/api/employees/', {
            method: 'POST',
            body: createFormData(formData),
        });

        const data = await response.json();
        responseHandler(data)

        getEmployees()
        const imageURL = data.imageUrl;
        displayEmployeeImage(imageURL)

    } catch (error) {
        console.error('Error:', error);
        createToast('error', error)
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