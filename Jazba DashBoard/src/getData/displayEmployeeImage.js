function displayEmployeeImage(imageUrl) {

    const employee_div = document.getElementById('employee_Images_Dis')

    const container = document.createElement('div');
    container.classList.add('w-1/8', 'p-1', 'm-2');
    container.style.width = '70px';
    container.style.height = '70px';

    const imgElement = document.createElement('img');
    imgElement.classList.add('p-2', 'rounded-full', 'shadow-md', 'w-full');
    imgElement.src = `${imageUrl}`;
    imgElement.alt = '#';
    imgElement.style.objectFit = 'cover';
    imgElement.style.width = '100%';
    imgElement.style.height = '100%';

    container.appendChild(imgElement);

    employee_div.appendChild(container);
    
} export default displayEmployeeImage