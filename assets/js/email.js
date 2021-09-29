const form = document.getElementById("feedback-form")
const fullName = document.getElementById("fname");
const email = document.getElementById("email");
const feedbackMessage = document.getElementById("feedback");

form.addEventListener("submit", emailSubmit())

(function() {
    emailjs.init("user_L7uacW24qxLqTCAOKYO1W");
})();

function emailSubmit() {
    e.preventDefault;

    // let fName = fullName.value;
    // let userEmail = email.value;
    // let userMessage = feedbackMessage.value;



    emailjs.sendForm("service_tghuhj4", "template_vzaxweo", "#feedback-form", "user_L7uacW24qxLqTCAOKYO1W").then(() { alert("Thank you for your feedback!") });
}