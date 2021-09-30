const form = document.getElementById("feedback-form")
const fullName = document.getElementById("fname");
const email = document.getElementById("email");
const feedbackMessage = document.getElementById("feedback");

document.getElementById("feedback-form").addEventListener("submit", emailSubmit)

function emailSubmit(event) {
    event.preventDefault();
    emailjs.sendForm("service_tghuhj4", "template_vzaxweo", form)
        .then(() => { alert("Thank you for your feedback!") },
        (error) => { console.log("Failed")});
};

function validation(field) {
    if (field.value.trim() === "") {
        field.style.border = "2px solid red"
    }
}