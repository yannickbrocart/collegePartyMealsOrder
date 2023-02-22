class FormValidator {
    // ES6 javascript class

    constructor(form, fields) {
        // constructor function
        this.form = form;
        this.fields = fields;
    }

    validateOnEntry() {
        let self = this;
        if (this.fields!=null) {
            this.fields.forEach(function (field) {
                field.addEventListener('input', function() {
                    self.validateFields(field);
                });
            });
        }
    }

    validateOnSubmit() {
        let self = this;
        this.form.addEventListener('submit', function() {
            event.preventDefault();
            this.fields.forEach(function (field) {
                field.addEventListener('input', function() {
                    self.validateFields(field);
                });
            });
        });
    }

    validateFields(field) {
        if (field.value.trim() === "") {
            this.setStatus(field, `Le champs ${field.previousElementSibling.innerText} ne peut être vide`, "error");
        } else {
            this.setStatus(field, null, "success");
        }

        if (field.type === "text") {
            const regex = /[a-zA-Z-_ ]{2,80}$/;
            if (regex.test(field.value)) {
                this.setStatus(field, null, "success");
            } else {
                this.setStatus(field, null, "error");
            }
        }

        if (field.type === "tel") {
            const regex = /0[1-79]{1}\s\d{2}\s\d{2}\s\d{2}\s\d{2}$/;
            if (regex.test(field.value)) {
                this.setStatus(field, null, "success");
            } else {
                this.setStatus(field, null, "error");
            }
        }

        if (field.type === "email") {
            const regex = /\S+@\S+\.\S{2,6}$/;
            if (regex.test(field.value)) {
                this.setStatus(field, null, "success");
            } else {
                this.setStatus(field, null, "error");
            }
        }
    }

    setStatus(field, message, status) {
        const successIcon = field.parentElement.querySelector('.icon-success');
        const errorIcon = field.parentElement.querySelector('.icon-error');
        if (status === "success") {
            if (errorIcon) { errorIcon.classList.add('hidden') }
            field.nextElementSibling.classList.remove('error-message');
            successIcon.classList.remove('hidden');
            field.classList.remove('input-error');
        }
        if (status === "error") {
            if (successIcon) { successIcon.classList.add('hidden') }
            field.nextElementSibling.classList.add('error-message');
            errorIcon.classList.remove('hidden');
            field.classList.add('input-error');
        }
    }
}

function validatePhoneNumberFormat(phoneNumber) {
    let regspace=/(\s)/g;
    let tempString = phoneNumber.value.replace(regspace, '')
    let reg=/([\d]{2})/g
    let regend=/\s$/
    if (tempString.length>5){
        phoneNumber.value=tempString.replace(reg,"$1 ").replace(regend,'')
    }
}


const form = document.getElementById("collegePartyMealsOrderForm");
const fields = document.querySelectorAll('input');

const identityForm = new FormValidator(form, fields);
identityForm.validateOnEntry();
// identityForm.validateOnSubmit();