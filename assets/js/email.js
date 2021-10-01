const form = document.getElementById("feedback-form");
const fullName = document.getElementById("fname");
const formEmail = document.getElementById("email");
const feedbackMessage = document.getElementById("feedback");
const errorClasses = document.getElementsByClassName("error-message");

var okCounter = 0;

document.getElementById("feedback-form").addEventListener("submit", validationStart);

function emailSubmit() {
    // event.preventDefault();
    console.log("Sending email!");
    emailjs.sendForm("service_tghuhj4", "template_vzaxweo", form)
        .then(() => { alert("Thank you for your feedback!"); },
        (error) => { console.log("Failed");});
}

function validationStart(event) {
    event.preventDefault();

    okCounter = 0;
    console.log("Pressed submit");
    validation(fullName, 0, "Name cannot be empty.");
    validation(formEmail, 1, "Email cannot be empty.");
    validation(feedbackMessage, 2, "Feedback field cannot be empty.");
    if (okCounter === 3) {
        console.log("errorClasses");
        emailSubmit();
    }
}

function validation(field, classNr, message) {
    if (field.value.trim() === "") {
        errorClasses[classNr].innerHTML = message;
        field.style.border = "2px solid red";
    } else {
        errorClasses[classNr].innerHTML = "";
        field.style.border = "2px solid green";
        console.log("Validated");
        okCounter++;
    }
}