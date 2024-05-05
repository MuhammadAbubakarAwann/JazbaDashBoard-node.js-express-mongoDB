import signupForm from './src/login/signup/signupForm.js';
import signinForm from './src/login/signin/signinForm.js';

const signupBtn = document.getElementById("signupBtn");
const signinBtn = document.getElementById("signinBtn");

window.onload = () => {

    signupBtn.addEventListener('click', signupForm)
    signinBtn.addEventListener('click', signinForm)

};