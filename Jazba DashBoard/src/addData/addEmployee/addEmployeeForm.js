import addEmployee from "./addEmployee.js"
async function addEmployeeForm() {
    try {
        const overlay = document.createElement('div');
        overlay.classList.add('fixed', 'inset-0', 'bg-black', 'opacity-50', 'z-40');
        document.body.appendChild(overlay);

        const response = await fetch('updateEmployeeForm.html');
        const html = await response.text();

        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        tempElement.classList.add('fixed', 'top-1/2', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2', 'w-120', 'h-120', 'bg-white', 'border', 'border-gray-300', 'shadow-lg', 'z-50', 'p-4', 'overflow-auto');

        const updateBtn = tempElement.querySelector('#updateBtn');
        updateBtn.addEventListener('click', () => {
            const teamTypeElements = tempElement.querySelectorAll('input[name="employee_teamType"]');
            let selectedTeamType;

            for (const element of teamTypeElements) {
                if (element.checked) {
                    selectedTeamType = element.value;
                    break;
                }
            }
            if (!selectedTeamType) {
                alert('Please select a team type');
                return;
            }
            const employee_name = tempElement.querySelector('#employee_name').value;
            const employee_phone = tempElement.querySelector('#employee_phone').value;
            const employee_designation = tempElement.querySelector('#employee_designation').value;
            const employee_bio = tempElement.querySelector('#employee_bio').value;
            const employee_image = tempElement.querySelector('#employee_image').files[0];
            const employee_teamType = selectedTeamType


            addEmployee(employee_name, employee_designation, employee_phone, employee_bio, employee_teamType, employee_image);
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

export default addEmployeeForm;
