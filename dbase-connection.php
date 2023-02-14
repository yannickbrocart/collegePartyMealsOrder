<?php
function mySqlConnection($dsn, $username, $password)
{
    try {
        $mySqlConnection = new PDO(
            $dsn,
            $username,
            $password,
            array(
                PDO::ATTR_PERSISTENT => true,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            )
        );
        return $mySqlConnection;
    } catch (PDOException $e) {
        $message = 'Erreur PDO dans ' . $e->getFile() . ' : ' . $e->getLine() . ' : ' . $e->getMessage();
        die($message);
    }
}