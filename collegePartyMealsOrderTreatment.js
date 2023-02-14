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

    validateFields(field) {
        if (field.value.trim() === "") {
        } else {

        }

        if (field.type === "email") {
            const regex = /\S+@\S+\.\S+/
            if (regex.test(field.value)) {

            } else {
                console.log('no');
            }
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