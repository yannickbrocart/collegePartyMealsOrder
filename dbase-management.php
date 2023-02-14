<?php

require_once 'dbase-connection.php';

define('DB_USER', 'root');
define('DB_PSWD', '');
define('DB_HOST','localhost');
define('DB_NAME','o62mh1x7vk2t148f');
define('DSN', 'mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset=utf8');

define('CREATE_DATABASE',
    'CREATE DATABASE IF NOT EXISTS o62mh1x7vk2t148f CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci');

define('CREATE_TABLES',
    'CREATE TABLE IF NOT EXISTS k57w_referents_parents (
        referent_parent_id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        referent_parent_last_name varchar(100) NOT NULL,
        referent_parent_first_name varchar(100) NOT NULL,
        referent_parent_mobile varchar(10) NOT NULL UNIQUE,
        referent_parent_email varchar(100) NOT NULL UNIQUE,
        INDEX referent_parent_last_name_index (referent_parent_last_name),
        INDEX referent_parent_first_name_index (referent_parent_first_name),
        INDEX referent_parent_mobile_index (referent_parent_mobile),
        INDEX referent_parent_email_index (referent_parent_email),
        CONSTRAINT U_referent_parent UNIQUE (referent_parent_last_name, referent_parent_first_name));
    CREATE TABLE IF NOT EXISTS k57w_other_responsable_adults (
        other_responsable_adult_id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        other_referent_parent_id bigint(20) UNSIGNED NOT NULL,
        other_responsable_adult_last_name varchar(100) NOT NULL,
        other_responsable_adult_first_name varchar(100) NOT NULL,
        other_responsable_adult_mobile varchar(10) NOT NULL,
        INDEX other_responsable_adult_last_name_index (other_responsable_adult_last_name),
        INDEX other_responsable_adult_first_name_index (other_responsable_adult_first_name),
        INDEX other_responsable_adult_mobile_index (other_responsable_adult_mobile),
        FOREIGN KEY (other_referent_parent_id) REFERENCES k57w_referents_parents(other_referent_parent_id) ON DELETE CASCADE);
    CREATE TABLE IF NOT EXISTS k57w_helps (
        help_referent_parent_id bigint(20) UNSIGNED NOT NULL,
        help_schedule_id bigint(20) UNSIGNED NOT NULL,
        FOREIGN KEY (help_referent_parent_id) REFERENCES k57w_referents_parents(help_referent_parent_id) ON DELETE CASCADE,
        FOREIGN KEY (help_schedule_id) REFERENCES k57w_help_schedules(help_schedule_id) ON DELETE CASCADE,
        PRIMARY KEY (help_referent_parent_id, help_schedule_id));
    CREATE TABLE IF NOT EXISTS k57w_help_schedules (
        help_schedule_name_id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        help_schedule_name varchar(100) NOT NULL,
        INDEX help_schedule_name_index (help_schedule_name));
    CREATE TABLE IF NOT EXISTS k57w_meals (
        meal_id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        meal_referent_parent_id bigint(20) UNSIGNED NOT NULL,
        meal_servings_number int(2) UNSIGNED NOT NULL,
        INDEX meal_servings_number_index (meal_servings_number),
        FOREIGN KEY (meal_referent_parent_id) REFERENCES k57w_referents_parents(meal_referent_parent_id) ON DELETE CASCADE)
    ');

define('INSERT_ORDER',
    'INSERT INTO k57w_referents_parents (referent_parent_last_name,referent_parent_first_name,referent_parent_mobile,referent_parent_email) VALUES (?,?,?,?)');

define('SELECT_ALL',
    'SELECT DISTINCT * FROM k57w_referents_parents 
    LEFT JOIN k57w_other_responsable_adults 
        ON referent_parent_id = other_referent_parent_id
    LEFT JOIN k57w_meals
        ON referent_parent_id = meal_referent_parent_id
    ORDER BY referent_parent_id');

define('SELECT_ALL_SCHEDULES',
    'SELECT DISTINCT help_schedule_name 
        FROM k57w_referents_parents
    LEFT JOIN k57w_helps
        ON referent_parent_id = help_referent_parent_id
    LEFT JOIN k57w_help_schedules
        ON help_schedule_id = help_schedule_name_id
    WHERE referent_parent_id = ?');

//////////////////////////////////////////
function createDatabase() {
    $mySqlConnection = mySqlConnection(DSN, DB_USER, DB_PSWD);
    $mySqlConnection->query(CREATE_DATABASE);
}

function createTables() {
    $mySqlConnection = mySqlConnection(DSN, DB_USER, DB_PSWD);
    $mySqlConnection->query(CREATE_TABLES);
}

function addOrder($referentParentLastNameInput,$referentParentFirstNameInput,$referentParentPhoneInput,$referentParentEmailInput) {
    $mySqlConnection = mySqlConnection(DSN, DB_USER, DB_PSWD);
    $prepareStatement = $mySqlConnection->prepare(INSERT_ORDER);
    $prepareStatement->bindParam(1, $referentParentLastNameInput);
    $prepareStatement->bindParam(2, $referentParentFirstNameInput);
    $prepareStatement->bindParam(3, $referentParentPhoneInput);
    $prepareStatement->bindParam(4, $referentParentEmailInput);
    $prepareStatement->execute();
}

//////////////////////////////////////////
createDatabase();
createTables();



function showOrders() {
    $mySqlConnection = mySqlConnection(DSN, DB_USER, DB_PSWD);
    $results = $mySqlConnection->query(SELECT_ALL);
    foreach ($results as $result) {
        echo nl2br("$result[0] $result[1] $result[2] $result[3] $result[4] $result[7] $result[8] $result[9] - portions : $result[12]\r\n");
        $prepareStatement = $mySqlConnection->prepare(SELECT_ALL_SCHEDULES);
        $prepareStatement->bindParam(1, $result[0]);
        $prepareStatement->execute();
        $statement = $prepareStatement->fetchAll();
        foreach ($statement as $row) {
            echo " ########### " . $row[0];
        }
        echo nl2br("\r\n");
    }
}

