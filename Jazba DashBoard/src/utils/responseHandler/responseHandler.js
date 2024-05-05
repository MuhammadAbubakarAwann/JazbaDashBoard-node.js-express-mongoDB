import createToast from "../notifications/notification.js";

export function responseHandler(data) {
    console.log("statud code: ",data.statusCode);

    switch (data.statusCode) {
        case 200:
        case 302:
            createToast('success', data.message);
            break;
        case 500:
        case 404:
        case 401:
        case 403:
            createToast('error', data.message);
            break;
        case 400:
        case 403: 
            createToast('warning', data.message);
            break;
        default:
            createToast('warning', data.message); 
            break;
    }
}
