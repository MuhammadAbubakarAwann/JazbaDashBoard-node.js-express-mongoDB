import signup from './signin.js'
async function signinForm() {
    try {
        const overlay = document.createElement('div');
        overlay.classList.add('fixed', 'inset-0', 'bg-black', 'opacity-50', 'z-40');
        document.body.appendChild(overlay);

        const response = await fetch('signin.html');
        const html = await response.text();

        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        tempElement.classList.add('fixed', 'top-1/2', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2', 'w-120', 'h-120', 'bg-white', 'border', 'border-gray-300', 'shadow-lg', 'z-50', 'p-4', 'overflow-auto');


        const signinBtn = tempElement.querySelector('#signinBtn');
        signinBtn.addEventListener('click', () => {

            const user_email = tempElement.querySelector('#user_email').value;
            const user_password = tempElement.querySelector('#user_password').value;

            signup(user_email, user_password);
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
export default signinForm;
