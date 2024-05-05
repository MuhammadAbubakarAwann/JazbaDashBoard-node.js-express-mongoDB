import addProject from "./addProject.js"
async function addProjectForm() {
    try {
        const overlay = document.createElement('div');
        overlay.classList.add('fixed', 'inset-0', 'bg-black', 'opacity-50', 'z-40');
        document.body.appendChild(overlay);

        const response = await fetch('updateProjectForm.html');
        const html = await response.text();

        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        tempElement.classList.add('fixed', 'top-1/2', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2', 'w-120', 'h-120', 'bg-white', 'border', 'border-gray-300', 'shadow-lg', 'z-50', 'p-4', 'overflow-auto');

        const updateBtn = tempElement.querySelector('#updateBtn');
        updateBtn.addEventListener('click', () => {
            const projectTypeElements = tempElement.querySelectorAll('input[name="projectType"]');
            let selectedProjectType;

            for (const element of projectTypeElements) {
                if (element.checked) {
                    selectedProjectType = element.value;
                    break;
                }
            }
            if (!selectedProjectType) {
                alert('Please select a project type');
                return;
            }
            const projectName = tempElement.querySelector('#projectName').value;
            const projectDescription = tempElement.querySelector('#projectDescription').value;
            const projectImage = tempElement.querySelector('#projectImage').files[0];
            const projectType = selectedProjectType;

            addProject(projectName, projectDescription, projectImage, projectType);
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
export default addProjectForm;
