import updateProject from "../updateProject.js";

async function updateProjectForm(id, projectName, projectDescription, projectImage, projectType) {
    try {
        const overlay = document.createElement('div');
        overlay.classList.add('fixed', 'inset-0', 'bg-black', 'opacity-50', 'z-40');
        document.body.appendChild(overlay);

        const response = await fetch('updateProjectForm.html');
        const html = await response.text();

        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        tempElement.classList.add('fixed', 'top-1/2', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2', 'w-120', 'h-120', 'bg-white', 'border', 'border-gray-300', 'shadow-lg', 'z-50', 'p-4', 'overflow-auto');

        tempElement.querySelector('#projectName').value = projectName;
        tempElement.querySelector('#projectDescription').value = projectDescription;

        const radioButtons = tempElement.querySelectorAll('input[name="projectType"]');
        radioButtons.forEach(button => {
            if (button.value === projectType) {
                button.checked = true;
            } else {
                button.checked = false;
            }
        });

        const updateBtn = tempElement.querySelector('#updateBtn');
        updateBtn.addEventListener('click', () => {
            const updatedProjectName = tempElement.querySelector('#projectName').value;
            const updatedProjectDescription = tempElement.querySelector('#projectDescription').value;
            const updatedProjectImage= tempElement.querySelector('#projectImage').value;
            const updatedProjectType = tempElement.querySelector('input[name="projectType"]:checked').value;

            updateProject(id, updatedProjectName, updatedProjectDescription, updatedProjectImage, updatedProjectType);
 
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

export default updateProjectForm;
