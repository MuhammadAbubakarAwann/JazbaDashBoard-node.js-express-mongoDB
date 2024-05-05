import getEmployees from "../../getData/getEmployeeData/getEmployeeData.js";
import createToast from "../../utils/notifications/notification.js";

async function updateEmployee(id, employee_name, employee_designation, employee_phone, employee_bio, employee_teamType, employee_image) {
    const updatedEmployee = {
        employee_name,
        employee_designation,
        employee_phone,
        employee_bio,
        employee_teamType,
        employee_image
    };

    const jsonData = JSON.stringify(updatedEmployee);

    fetch(`http://localhost:3000/api/employees/${id}`, {
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
                return;
            }
            console.log(data.success, data.message, data.data);
            createToast('success', data.message)
            getEmployees()

        })
        .catch(error => {
            console.log("Error Updating Employee:", error);
            console.log('error', error)
        });

}

export default updateEmployee;