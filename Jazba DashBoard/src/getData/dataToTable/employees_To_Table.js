import deleteBtn from "../../deleteData/deleteBtn/deleteProjectBtn.js";
import updateBtn from "../../updateData/updateBtn/updateBtn.js";
import deleteSingleEmployee from "../../deleteData/deleteEmployeeData/deleteSingleEmployee.js";
import updateEmployeeForm from "../../updateData/updateEmployee/updateEmployeeForm/Form_updateEmployee.js"

function addEmployeesToTable(employee_name, employee_phone, employee_designation, employee_bio, employee_teamType, employee_image, id) {

    const employee_Table = document.getElementById('employee_Table').getElementsByTagName('tbody')[0];

    const row = document.createElement('tr');
    row.classList.add('odd:bg-gray-400', 'bg-gray-200', 'text-gray-800');

    const cell1 = createTextCell(employee_name);
    const cell2 = createTextCell(employee_designation);
    const cell3 = createTextCell(employee_phone);
    const cell4 = createTextCell(employee_bio);
    const cell5 = createTextCell(employee_teamType);
    const cell6 = createTextCell(employee_image);

    const cell7 = document.createElement('td');
    cell7.classList.add('p-2', 'text-left', 'flex', 'gap-2');

    const deleteEmployeesBtn = deleteBtn();
    const updateEmployeeBtn = updateBtn();

    cell7.appendChild(updateEmployeeBtn);
    cell7.appendChild(deleteEmployeesBtn);

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);
    row.appendChild(cell6);
    row.appendChild(cell7);
    row.id = id;

    deleteEmployeesBtn.addEventListener('click', () => {
        deleteSingleEmployee(id);
        row.remove();
    });

    updateEmployeeBtn.addEventListener('click', () => {
        updateEmployeeForm(id, employee_name, employee_designation, employee_phone, employee_bio, employee_teamType, employee_image)
    });

    employee_Table.appendChild(row);

    function createTextCell(value) {
        const cell = document.createElement('td');
        cell.classList.add('p-2', 'text-center');
        cell.textContent = value;
        return cell;
    }

}

export default addEmployeesToTable;
