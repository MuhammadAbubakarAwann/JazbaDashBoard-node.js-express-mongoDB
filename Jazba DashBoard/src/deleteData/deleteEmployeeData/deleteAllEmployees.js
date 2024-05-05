import createToast from '../../utils/notifications/notification.js';
import getEmployees from "../../getData/getEmployeeData/getEmployeeData.js";
import { getToken } from '../../utils/tokenHandling/getTokenFromLocalStorage.js';
import { responseHandler } from '../../utils/responseHandler/responseHandler.js';

const token = getToken();

function deleteAllEmployees() {
    const employee_Table = document.getElementById('employee_Table').getElementsByTagName('tbody')[0];

    fetch("http://localhost:3000/api/employees/", {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 403) {
                    createToast('warning', 'You are not authorized to delete employees');
                    return;
                } else {
                    createToast('error', 'Error occurred while deleting Employees');
                }
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            employee_Table.textContent = "";
            getEmployees();

            responseHandler(data)
        })
        .catch(error => {
            console.error('Error deleting Employees:', error);
        });
}

export default deleteAllEmployees;
