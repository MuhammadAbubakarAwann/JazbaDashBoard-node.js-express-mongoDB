function employeeCounter() {

    const employee_Table = document.getElementById('employee_Table').getElementsByTagName('tbody')[0];
    const numberOfEmployees = employee_Table.rows.length;

    const employeeCounterDiv = document.getElementById("employeesCounter")
    employeeCounterDiv.textContent = "( " + numberOfEmployees + " )"

}
export default employeeCounter
