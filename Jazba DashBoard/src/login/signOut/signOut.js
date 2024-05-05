import createToast from "../../utils/notifications/notification.js";

export function signOut() {
    localStorage.removeItem('token')
    setTimeout(function () {

        window.location.href = "main.html";

    }, 1000)

    createToast('success', "Your are signed out.")

}
