/* FORM */

const form = document.querySelector("#contact-form");
const fullName = document.querySelector("#name");
const email = document.querySelector("#e-mail");
const subject = document.querySelector("#subject");
const details = document.querySelector("#details");

// Form Function

function validateRegistration(event) {

    event.preventDefault();

    // Validate Subject length 
    if (checkLength(subject.value, 15)) {

        subjectError.style.display = "none";

    } else {

        subjectError.style.display = "block";
    }

    // Validate Name length

    if (checkLength(fullName.value, 5)) {

        nameError.style.display = "none";

    } else {

        nameError.style.display = "block";

    }

    // Validate Message Length

    if (checkLength(details.value, 25)) {

        detailsError.style.display = "none";

    } else {

        detailsError.style.display = "block";

    }
    
    // Validate e-mail format

    if (validateEmail(email.value)) {

        emailError.style.display = "none";
  
    } else {

        emailError.style.display = "block";

    }

    if (checkLength(fullName.value, 5) && checkLength(subject.value, 15) && checkLength(details.value, 25) && validateEmail(email.value)) {
        document.location.href = "./formsent.html";
    }
}

form.addEventListener("submit", validateRegistration);




// Length Validation Function

function checkLength(value, length) {
    
    if(value.trim().length >= length) {

        return true;

    } else {

        return false;

    }
}

// E-mail Validation Function

function validateEmail(email) {

    const regEx = /\S+@\S+\.\S+/;

    const characterMatch = regEx.test(email);

    return characterMatch;

}