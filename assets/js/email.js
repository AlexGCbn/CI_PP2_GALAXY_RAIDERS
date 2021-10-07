const form = document.getElementById("feedback-form");
const fullName = document.getElementById("fname");
const formEmail = document.getElementById("email");
const feedbackMessage = document.getElementById("feedback");
const errorClasses = document.getElementsByClassName("error-message");

document.getElementById("feedback-form").addEventListener("submit", validationStart);

/**
 * EmailJS function to send form as email.
 */
function emailSubmit() {
    emailjs.sendForm("service_tghuhj4", "template_vzaxweo", form)
        .then(() => { alert("Thank you for your feedback!"); form.reset();},
        (error) => { alert("Form submission failed!");});
}

/**
 * Starts validation and if it passes calls the email submit function.
 */
function validationStart(event) {
    event.preventDefault();
    emailjs.init("user_L7uacW24qxLqTCAOKYO1W");

    let firstCheck = nameValidation(fullName, 0);
    let secondCheck = emailValidation(formEmail, 1);
    let thirdCheck = messageValidation(feedbackMessage, 2);
    
    if (firstCheck && secondCheck && thirdCheck) {
        emailSubmit();
    }
}

// Validation functions inspired by https://www.codexworld.com/how-to/validate-first-last-name-with-regular-expression-using-javascript/

/**
 * Name validation function. Checks if name contains appropriate letters and is not empty. Credits: https://regexr.com/39c7p
 */
function nameValidation(field, classNr) {
    let regName = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
    if (field.value.trim() === "") {
        errorClasses[classNr].innerHTML = "Please provide a full name.";
        field.style.border = "2px solid red";
    } else if (!regName.test(field.value)) {
        errorClasses[classNr].innerHTML = "Please provide first and last name. Valid characters: a-z, A-Z.";
        field.style.border = "2px solid red";
        return false;
    } else {
        errorClasses[classNr].innerHTML = "";
        field.style.border = "2px solid green";
        return true;
    }
}

/**
 * Email validation function. Credits: https://regexr.com/2rhq7
 */
function emailValidation(field, classNr) {
    let regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (field.value.trim() === "") {
        errorClasses[classNr].innerHTML = "Please provide an email.";
        field.style.border = "2px solid red";
    } else if (!regEmail.test(field.value)) {
        errorClasses[classNr].innerHTML = "Valid characters: a-z, A-Z, ";
        field.style.border = "2px solid red";
        return false;
    } else {
        errorClasses[classNr].innerHTML = "";
        field.style.border = "2px solid green";
        return true;
    }
}

/**
 * Checks if message is at least 5 characters long and maximum 750 long.
 */
function messageValidation(field, classNr) {
    let feedbackMsg = field.value;
    let strLen = feedbackMsg.length;
    if (field.value.trim() === "") {
        errorClasses[classNr].innerHTML = "Please provide some content in feedback form.";
        field.style.border = "2px solid red";
    } else if (strLen < 5 || strLen > 750) {
        errorClasses[classNr].innerHTML = "Minimum characters: 5. Maximum characters: 750.";
        field.style.border = "2px solid red";
        return false;
    } else {
        errorClasses[classNr].innerHTML = "";
        field.style.border = "2px solid green";
        return true;
    }
}