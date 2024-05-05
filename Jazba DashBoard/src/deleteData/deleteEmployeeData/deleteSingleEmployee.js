import createToast from '../../utils/notifications/notification.js';
import getEmployees from "../../getData/getEmployeeData/getEmployeeData.js";
import { getToken } from '../../utils/tokenHandling/getTokenFromLocalStorage.js';
import { responseHandler } from '../../utils/responseHandler/responseHandler.js';

const token = getToken();

function deleteSingleEmployee(deleteEmployee_id) {

    fetch(`http://localhost:3000/api/employees/${deleteEmployee_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
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
            responseHandler(data)
            getEmployees()

        })
        .catch(error => {
            console.log("Error Deleting  project:", error);
            createToast('error', "Error While deleting single Employee")
        });


} export default deleteSingleEmployee