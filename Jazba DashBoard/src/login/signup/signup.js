import createToast from "../../utils/notifications/notification.js";
import { responseHandler } from "../../utils/responseHandler/responseHandler.js";

async function signup(userName, userEmail, userPassword, role) {

    const formData = {
        userName: userName,
        userEmail: userEmail,
        userPassword: userPassword,
        role: role,

    };
    try {
        const response = await fetch('http://localhost:3000/api/login/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        responseHandler(data);

    } catch (error) {
        console.error('Error:', error);
        createToast('error', "Error signing in ")
    }
}
export default signup
