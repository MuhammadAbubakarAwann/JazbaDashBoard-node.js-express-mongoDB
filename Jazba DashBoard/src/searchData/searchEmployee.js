import addEmployeesToTable from "../getData/dataToTable/employees_To_Table.js";
import createToast from "../utils/notifications/notification.js";
import { responseHandler } from "../utils/responseHandler/responseHandler.js";

function searchEmployee() {
    const search_Bar_Input_Text = document.getElementById('search_Employee_Input')

    if (search_Bar_Input_Text.value == '') return

    const employee_name = search_Bar_Input_Text.value;

    const employee_Table = document.getElementById('employee_Table').getElementsByTagName('tbody')[0];
    employee_Table.innerHTML = ''

    fetch(`http://localhost:3000/api/employees/${employee_name}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            console.log("data : "),data;
            data.data.forEach(employee => {
                addEmployeesToTable(employee.employee_name, employee.employee_phone, employee.employee_designaion, employee.employee_bio, employee.employee_teamType, employee.employee_image)
            });
        })
        .catch(error => {
            console.log("Error retrieving data:", error);
            createToast('error', "Error retrieving data");
        });

    search_Bar_Input_Text.value = "";
}
export default searchEmployee