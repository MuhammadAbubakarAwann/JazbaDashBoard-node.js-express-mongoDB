import createToast from "../../utils/notifications/notification.js";
import { isAuthorized } from "../../utils/authorized/isAuthorized.js";
import { setToken } from "../../utils/tokenHandling/setTokenToLocalStorage.js";
import { responseHandler } from "../../utils/responseHandler/responseHandler.js";

async function signin(userEmail, userPassword) {

    const formData = {
        userEmail,
        userPassword
    };
    try {
        const response = await fetch('http://localhost:3000/api/login/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log('Response data:', data);

        
        responseHandler(data);
        isAuthorized(data.success)
        setToken(data.token);

    } catch (error) {
        console.error('Error:', error);
        createToast('error', "Error signing in ")
    }
}


export default signin
