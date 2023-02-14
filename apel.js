// function validForm(of) {
//     if ( !document.getElementById || !document.createTextNode ) { return; }
//     if ( !document.getElementById('required') ) { return; }
//
//     var requiredFields = document.getElementById('required').value.split(',');
//     for (var i=0 ; i<requiredFields.length ; i++)
//     {
//         var field=document.getElementById(requiredFields[i]);
//         if ( !field ){ continue;
//             switch( field.type.toLowerCase() ) {
//                 case "text" :
//                     if ( field.value=='' && field.id!='email' ) { indicatorFormError(field) };
//                     if ( field.id=='email' && !cf_isEmailAddr(field.value) ) { indicatorFormError(field) };
//                     break;
//                 case  "checkbox" :
//                     if( !field.checked ) { indicatorFormError(field) };
//                 break;
//             }
//         }
//     }
// }
//
// function indicatorFormError(o) {
//     alert( "Please provide your name!" );
// }

function phoneNumberFormat(phoneNumber) {
    let regspace=/(\s)/g;
    tempString=phoneNumber.value.replace(regspace,'')
    let reg=/([\d]{2})/g
    let regend=/\s$/
    if (tempString.length>5){
        phoneNumber.value=tempString.replace(reg,"$1 ").replace(regend,'')
    }
}

function validIdentityForm(identityForm) {
    // if ( !document.getElementById || !document.createTextNode ) { return; }
    // if ( !document.getElementById('required') ) { return; }

    // let referentParentLastNameInput = document.getElementById('referentParentLastNameInput');
    // let referentParentLastNameInputMsg = document.getElementById('referentParentLastNameInputMsg');
    // let referentParentFirstNameInput = document.getElementById('referentParentFirstNameInput');
    // let referentParentFirstNameInputMsg = document.getElementById('referentParentFirstNameInputMsg');
    // let referentParentPhoneInput = document.getElementById('referentParentPhoneInput');
    // let referentParentEmailInput = document.getElementById('referentParentEmailInput');

    Array.from(identityForm.elements).forEach(input => {
        if (input.nodeName === "INPUT" && input.type !== "checkbox") {
            if (!input.value) { input.nextElementSibling.classList.add("error"); }
            if (input.value) { input.nextElementSibling.classList.remove("error"); }
        }
    });

    // if (referentParentLastNameInput.value=="") {showErrorMsg("Le prénom est un champ obligatoire à renseigner.", "referentParentLastNameInputMsg");}
    // if (referentParentFirstNameInput.value=="") {showErrorMsg("Le nom est un champ obligatoire à renseigner.", "referentParentFirstNameInputMsg");}

    // function showErrorMsg(msg, msgId) {
    //     msgId.textContent = msg;
    //     msgId.classList.add("error");
    // }


    // if (referentParentFirstNameInput.value=='') {referentParentFirstNameInputMsg.textContent="Le nom est un champ obligatoire à renseigner."};

    // for(var index=0 ; index<form.getElementsByTagName('input').length ; index++)
    // {


    // }
    return false;
}








// var otherResponsableAdultCheckbox = document.getElementById("otherResponsableAdultCheckbox");
// var otherResponsableAdult = document.getElementById("otherResponsableAdult");
// var otherResponsableAdultFirstNameInput = document.getElementById("otherResponsableAdultFirstNameInput");
// var otherResponsableAdultNameInput = document.getElementById("otherResponsableAdultNameInput");
// var otherResponsableAdultMobileInput = document.getElementById("otherResponsableAdultMobileInput");
// otherResponsableAdult.disabled = otherResponsableAdult.disabled;
// otherResponsableAdultFirstNameInput.required = false;
// otherResponsableAdultNameInput.required = false;
// otherResponsableAdultMobileInput.required = false;
// otherResponsableAdultCheckbox.onchange = function() {
//     if(otherResponsableAdultCheckbox.checked) {
//         otherResponsableAdult.disabled = !otherResponsableAdult.disabled;
//         otherResponsableAdultFirstNameInput.required = true;
//         otherResponsableAdultNameInput.required = true;
//         otherResponsableAdultMobileInput.required = true;
//     } else {
//         otherResponsableAdult.disabled = otherResponsableAdult.disabled;
//         otherResponsableAdultFirstNameInput.required = false;
//         otherResponsableAdultNameInput.required = false;
//         otherResponsableAdultMobileInput.required = false;
//     }
// }

// var identitySubmitCheckbox = document.getElementById("identitySubmitCheck");
// var identitySubmit = document.getElementById("identitySubmit");
// identitySubmit.disabled = true;
//
// identitySubmitCheckbox.onchange = function() {
//     if(identitySubmitCheckbox.checked) {
//         identitySubmit.disabled = false;
//     } else {
//         identitySubmit.disabled = true; } }


