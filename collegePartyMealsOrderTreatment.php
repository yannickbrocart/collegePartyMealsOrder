<?php

require_once 'dbase-management.php';

//////////////////////////////////////////
if (isset($_POST['identitySubmit'])) {
    addOrder(
        $_POST['referentParentLastNameInput'],
        $_POST['referentParentFirstNameInput'],
        str_replace(' ', '', $_POST['referentParentPhoneInput']),
        $_POST['referentParentEmailInput']
    );
    showOrders();
}