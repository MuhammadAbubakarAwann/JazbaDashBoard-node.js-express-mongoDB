import updateEmployee from "../updateEmployee.js";

async function updateEmployeeForm(id, employee_name, employee_designation, employee_phone, employee_bio, employee_teamType, employee_image) {
    try {
        const overlay = document.createElement('div');
        overlay.classList.add('fixed', 'inset-0', 'bg-black', 'opacity-50', 'z-40');
        document.body.appendChild(overlay);

        const response = await fetch('updateEmployeeForm.html');
        const html = await response.text();

        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        tempElement.classList.add('fixed', 'top-1/2', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2', 'w-120', 'h-120', 'bg-white', 'border', 'border-gray-300', 'shadow-lg', 'z-50', 'p-4', 'overflow-auto');

        tempElement.querySelector('#employee_name').value = employee_name;
        tempElement.querySelector('#employee_phone').value = employee_phone;
        tempElement.querySelector('#employee_designation').value = employee_designation;
        tempElement.querySelector('#employee_bio').value = employee_bio;

        const radioButtons = tempElement.querySelectorAll('input[name="employee_teamType"]');
        radioButtons.forEach(button => {
            if (button.value === employee_teamType) {
                button.checked = true;
            } else {
                button.checked = false;
            }
        });

        const updateBtn = tempElement.querySelector('#updateBtn');
        updateBtn.addEventListener('click', () => {
            const updatedEmployeeName = tempElement.querySelector('#employee_name').value;
            const updatedPhoneNumber = tempElement.querySelector('#employee_phone').value;
            const updatedEmployeeDesignation = tempElement.querySelector('#employee_designation').value;
            const updatedEmployeeBio = tempElement.querySelector('#employee_bio').value;
            const updatedEmployeeImage= tempElement.querySelector('#employee_image').value;
            const updatedEmployeeTeamType = tempElement.querySelector('input[name="employee_teamType"]:checked').value;
            

            updateEmployee(id, updatedEmployeeName, updatedEmployeeDesignation, updatedPhoneNumber, updatedEmployeeBio, updatedEmployeeTeamType, updatedEmployeeImage);
 
            overlay.remove();
            tempElement.remove();
        });


        const cancelBtn = tempElement.querySelector('#cancelBtn');
        cancelBtn.addEventListener('click', () => {

            overlay.remove();
            tempElement.remove();
        });

        document.body.appendChild(tempElement);
    } catch (error) {
        console.error('Error loading update form:', error);
    }
}

export default updateEmployeeForm;
