import getProjects from './src/getData/getProjectData/getProjectData.js';
import getEmployees from './src/getData/getEmployeeData/getEmployeeData.js';
import searchEmployee from './src/searchData/searchEmployee.js';
import deleteAllProjects from './src/deleteData/deleteProjectsData/deleteAllProjects.js';
import deleteAllEmployees from './src/deleteData/deleteEmployeeData/deleteAllEmployees.js';
import addEmployeeForm from './src/addData/addEmployee/addEmployeeForm.js';
import addProjectForm from './src/addData/AddProject/addProjectForm.js';
import { signOut } from './src/login/signOut/signOut.js';


const addEmployeeButton = document.getElementById("add_Employee_Button")
const addProjectButton = document.getElementById("add_Project_Button");
const employee_Search_btn = document.getElementById("employee_Search_btn")
const deleteAllProjectsBtn = document.getElementById("deleteProjectListBtn");
const deleteEmployeeListBtn = document.getElementById("deleteEmployeeListBtn");
const signoutBtn = document.getElementById("signOutBtn")


window.onload = () => {

    getProjects();
    getEmployees();
    employee_Search_btn.addEventListener('click', searchEmployee);
    deleteEmployeeListBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to delete all employees?")) {
            deleteAllEmployees();
        }
    });
    deleteAllProjectsBtn.addEventListener('click', () => {
        if (confirm("Are you sure you want to delete all Projects?")) {
            deleteAllProjects();
        }
    });
    addEmployeeButton.addEventListener('click', addEmployeeForm);
    addProjectButton.addEventListener('click', addProjectForm);
    signoutBtn.addEventListener('click', signOut)
    
};
