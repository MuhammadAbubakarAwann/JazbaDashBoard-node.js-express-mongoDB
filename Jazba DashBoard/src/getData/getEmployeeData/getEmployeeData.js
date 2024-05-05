import addEmployeesToTable from '../dataToTable/employees_To_Table.js'
import { employeeReloader } from '../../utils/reloaders/employeesReloader.js';
import employeeCounter from '../../utils/counter/employeeCounter.js';
import { responseHandler } from '../../utils/responseHandler/responseHandler.js';

function getEmployees() {
    employeeReloader()

    fetch("http://localhost:3000/api/employees/")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.data.forEach(employee => {
                addEmployeesToTable(employee.employee_name, employee.employee_phone, employee.employee_designation, employee.employee_bio, employee.employee_teamType, employee.employee_image, employee._id)
            
            });
            employeeCounter()

            if(!data.success){
                responseHandler(data)
            }
            
        })
        .catch(error => {
            console.log("Error retrieving data:", error);
        });
}

export default getEmployees;



