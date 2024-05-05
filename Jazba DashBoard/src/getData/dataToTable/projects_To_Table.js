import deleteBtn from "../../deleteData/deleteBtn/deleteProjectBtn.js";
import updateBtn from "../../updateData/updateBtn/updateBtn.js";
import deleteSingleProject from "../../deleteData/deleteProjectsData/deleteSingleProject.js";
//import updateProject from "../../updateData/updateProject/updateProject.js";
import updateProjectForm from "../../updateData/updateProject/updateProjectForm/Form_updateProject.js"

function addProjectsToTable(projectName, projectDescription, projectImage, projectType, id) {
    const project_Table = document.getElementById('project_Table').getElementsByTagName('tbody')[0];
    const row = document.createElement('tr');
    row.classList.add('odd:bg-gray-400', 'bg-gray-200', 'text-gray-800');

    const cell1 = createTextCell(projectName);
    const cell2 = createTextCell(projectDescription);
    const cell3 = createTextCell(projectImage);
    const cell4 = createTextCell(projectType);

    const cell5 = document.createElement('td');
    cell5.classList.add('p-2', 'text-center', 'flex', 'gap-2');

    const deleteProjectBtn = deleteBtn();
    const updateProjectBtn = updateBtn();

    cell5.appendChild(updateProjectBtn);
    cell5.appendChild(deleteProjectBtn);

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);
    row.id = id;

    deleteProjectBtn.addEventListener('click', () => {
        deleteSingleProject(id);
        row.remove();
    });

    updateProjectBtn.addEventListener('click', () => {
        updateProjectForm(id, projectName, projectDescription, projectImage, projectType);
    });

    function createTextCell(value) {
        const cell = document.createElement('td');
        cell.classList.add('p-2', 'text-center');
        cell.textContent = value;
        return cell;
    }

    project_Table.appendChild(row);
}



export default addProjectsToTable;
